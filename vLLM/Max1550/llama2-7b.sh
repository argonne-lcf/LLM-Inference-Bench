#!/bin/bash
#PBS -l select=1
#PBS -A Aurora_deployment
#PBS -l walltime=02:00:00
#PBS -N llama_2_7b_f16
#PBS -q workq-route

module use /opt/aurora/24.086.0/modulefiles
module load frameworks/2024.1
# module load thapi
# module load xpu-smi
conda activate vllm

export HF_TOKEN="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"
export HF_HOME="/gila/Aurora_deployment/sraskar/llm_research/hf"
export HF_DATASETS_CACHE="/gila/Aurora_deployment/sraskar/llm_research/hf"

export TMPDIR="/gila/Aurora_deployment/sraskar/llm_research/tmp_dir/"
export RAY_TMPDIR='/tmp'

for model_name in "meta-llama/Llama-2-7b-hf";do
    for tensor_parallel in 1 2 4; do
        for batch_size in 1 16 32 64; do
            for input_output_length in 128 256 512 1024 2048; do
                python3 benchmark_latency.py --device xpu --model=$model_name --tensor-parallel-size=$tensor_parallel --input-len=$input_output_length --output-len=$input_output_length --batch-size=$batch_size --dtype="float16" --trust-remote-code
            done
        done
    done
done