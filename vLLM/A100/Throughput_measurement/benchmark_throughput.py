"""Benchmark the latency of processing a single batch of requests."""
import argparse
import json
import time
from pathlib import Path
from typing import List, Optional

import numpy as np
import torch
from tqdm import tqdm

from vllm import LLM, SamplingParams
from vllm.engine.arg_utils import EngineArgs
from vllm.model_executor.layers.quantization import QUANTIZATION_METHODS
from vllm.utils import FlexibleArgumentParser
import csv
import os

def main(args: argparse.Namespace):
    print(args)
    
    llm = LLM(
        model=args.model,
        tokenizer=args.tokenizer,
        quantization=args.quantization,
        tensor_parallel_size=args.tensor_parallel_size,
        trust_remote_code=args.trust_remote_code,
        dtype=args.dtype,
        max_model_len=args.max_model_len,
        enforce_eager=args.enforce_eager,
        kv_cache_dtype=args.kv_cache_dtype,
        device=args.device,
        ray_workers_use_nsight=args.ray_workers_use_nsight,
        use_v2_block_manager=args.use_v2_block_manager,
        enable_chunked_prefill=args.enable_chunked_prefill,
        download_dir='/lus/grand/projects/datascience/krishnat/model_weights/LLaMA/llama_cache/',
        block_size=args.block_size,
        gpu_memory_utilization=args.gpu_memory_utilization,
        load_format=args.load_format,
        distributed_executor_backend=args.distributed_executor_backend,
        otlp_traces_endpoint=args.otlp_traces_endpoint,
        enable_prefix_caching=args.enable_prefix_caching,
    )


    sampling_params = SamplingParams(
        n=args.n,
        temperature=0.0 if args.use_beam_search else 1.0,
        top_p=1.0,
        use_beam_search=args.use_beam_search,
        ignore_eos=True,
        max_tokens=args.output_len,
    )
    
    print(sampling_params)
    dummy_prompt_token_ids = np.random.randint(10000,
                                            size=(args.batch_size,
                                                    args.input_len))
    
    dummy_inputs = [{
        "prompt_token_ids": batch
    } for batch in dummy_prompt_token_ids.tolist()]
    
    
    print("Warming up...")
    for _ in tqdm(range(3), desc="Warmup iterations"):
        llm.generate(dummy_inputs, sampling_params=sampling_params, use_tqdm=False)

    start_time = time.perf_counter()
    llm.generate(dummy_inputs, sampling_params=sampling_params, use_tqdm=False)
    end_time = time.perf_counter()
    latency = end_time - start_time
    total_tokens = args.batch_size*(args.input_len + args.input_len)
    throughput =  total_tokens/latency

    list_1 = ["Hardware", "Num of Hardware", "Framework", "Model", "Input Output Length", "Batch Size", "latency", "throughput"]
    list_2 = ["Nvidia A100 GPU", args.tensor_parallel_size, "vLLM", args.model, args.input_len, args.batch_size, latency, throughput] 

    assert len(list_1) == len(list_2)

    csv_file = "LLM_Inference_Bench_vLLM_throughput.csv"
    file_exists = os.path.exists(csv_file)

    with open(csv_file, 'a', newline = '') as csvfile:
        writer = csv.writer(csvfile)
        
        if not file_exists:
            writer.writerow(list_1)
        
        writer.writerow(list_2) 
        
    csvfile.close()


if __name__ == '__main__':
    parser = FlexibleArgumentParser(
        description='Benchmark the latency of processing a single batch of '
        'requests till completion.')
    parser.add_argument('--model', type=str, default='facebook/opt-125m')
    parser.add_argument('--speculative-model', type=str, default=None)
    parser.add_argument('--num-speculative-tokens', type=int, default=None)
    parser.add_argument('--speculative-draft-tensor-parallel-size',
                        '-spec-draft-tp',
                        type=int,
                        default=None)
    parser.add_argument('--tokenizer', type=str, default=None)
    parser.add_argument('--quantization',
                        '-q',
                        choices=[*QUANTIZATION_METHODS, None],
                        default=None)
    parser.add_argument('--tensor-parallel-size', '-tp', type=int, default=1)
    parser.add_argument('--input-len', type=int, default=32)
    parser.add_argument('--output-len', type=int, default=128)
    parser.add_argument('--batch-size', type=int, default=8)
    parser.add_argument('--n',
                        type=int,
                        default=1,
                        help='Number of generated sequences per prompt.')
    parser.add_argument('--use-beam-search', action='store_true')
    parser.add_argument('--num-iters-warmup',
                        type=int,
                        default=10,
                        help='Number of iterations to run for warmup.')
    parser.add_argument('--num-iters',
                        type=int,
                        default=30,
                        help='Number of iterations to run.')
    parser.add_argument('--trust-remote-code',
                        action='store_true',
                        help='trust remote code from huggingface')
    parser.add_argument(
        '--max-model-len',
        type=int,
        default=None,
        help='Maximum length of a sequence (including prompt and output). '
        'If None, will be derived from the model.')
    parser.add_argument(
        '--dtype',
        type=str,
        default='auto',
        choices=['auto', 'half', 'float16', 'bfloat16', 'float', 'float32'],
        help='data type for model weights and activations. '
        'The "auto" option will use FP16 precision '
        'for FP32 and FP16 models, and BF16 precision '
        'for BF16 models.')
    parser.add_argument('--enforce-eager',
                        action='store_true',
                        help='enforce eager mode and disable CUDA graph')
    parser.add_argument(
        '--kv-cache-dtype',
        type=str,
        choices=['auto', 'fp8', 'fp8_e5m2', 'fp8_e4m3'],
        default="auto",
        help='Data type for kv cache storage. If "auto", will use model '
        'data type. CUDA 11.8+ supports fp8 (=fp8_e4m3) and fp8_e5m2. '
        'ROCm (AMD GPU) supports fp8 (=fp8_e4m3)')
    parser.add_argument(
        '--quantization-param-path',
        type=str,
        default=None,
        help='Path to the JSON file containing the KV cache scaling factors. '
        'This should generally be supplied, when KV cache dtype is FP8. '
        'Otherwise, KV cache scaling factors default to 1.0, which may cause '
        'accuracy issues. FP8_E5M2 (without scaling) is only supported on '
        'cuda version greater than 11.8. On ROCm (AMD GPU), FP8_E4M3 is '
        'instead supported for common inference criteria.')
    parser.add_argument(
        '--profile',
        action='store_true',
        help='profile the generation process of a single batch')
    parser.add_argument(
        '--profile-result-dir',
        type=str,
        default=None,
        help=('path to save the pytorch profiler output. Can be visualized '
              'with ui.perfetto.dev or Tensorboard.'))
    parser.add_argument(
        "--device",
        type=str,
        default="auto",
        choices=["auto", "cuda", "cpu", "openvino", "tpu", "xpu"],
        help='device type for vLLM execution, supporting CUDA, OpenVINO and '
        'CPU.')
    parser.add_argument('--block-size',
                        type=int,
                        default=16,
                        help='block size of key/value cache')
    parser.add_argument(
        '--enable-chunked-prefill',
        action='store_true',
        help='If True, the prefill requests can be chunked based on the '
        'max_num_batched_tokens')
    parser.add_argument("--enable-prefix-caching",
                        action='store_true',
                        help="Enable automatic prefix caching")
    parser.add_argument('--use-v2-block-manager', action='store_true')
    parser.add_argument(
        "--ray-workers-use-nsight",
        action='store_true',
        help="If specified, use nsight to profile ray workers",
    )
    parser.add_argument('--download-dir',
                        type=str,
                        default=None,
                        help='directory to download and load the weights, '
                        'default to the default cache dir of huggingface')
    parser.add_argument(
        '--output-json',
        type=str,
        default=None,
        help='Path to save the latency results in JSON format.')
    parser.add_argument('--gpu-memory-utilization',
                        type=float,
                        default=0.9,
                        help='the fraction of GPU memory to be used for '
                        'the model executor, which can range from 0 to 1.'
                        'If unspecified, will use the default value of 0.9.')
    parser.add_argument(
        '--load-format',
        type=str,
        default=EngineArgs.load_format,
        choices=[
            'auto', 'pt', 'safetensors', 'npcache', 'dummy', 'tensorizer',
            'bitsandbytes'
        ],
        help='The format of the model weights to load.\n\n'
        '* "auto" will try to load the weights in the safetensors format '
        'and fall back to the pytorch bin format if safetensors format '
        'is not available.\n'
        '* "pt" will load the weights in the pytorch bin format.\n'
        '* "safetensors" will load the weights in the safetensors format.\n'
        '* "npcache" will load the weights in pytorch format and store '
        'a numpy cache to speed up the loading.\n'
        '* "dummy" will initialize the weights with random values, '
        'which is mainly for profiling.\n'
        '* "tensorizer" will load the weights using tensorizer from '
        'CoreWeave. See the Tensorize vLLM Model script in the Examples'
        'section for more information.\n'
        '* "bitsandbytes" will load the weights using bitsandbytes '
        'quantization.\n')
    parser.add_argument(
        '--distributed-executor-backend',
        choices=['ray', 'mp'],
        default=None,
        help='Backend to use for distributed serving. When more than 1 GPU '
        'is used, will be automatically set to "ray" if installed '
        'or "mp" (multiprocessing) otherwise.')
    parser.add_argument(
        '--otlp-traces-endpoint',
        type=str,
        default=None,
        help='Target URL to which OpenTelemetry traces will be sent.')
    args = parser.parse_args()
    main(args)
