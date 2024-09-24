export HF_TOKEN="your_hugging_face_token"
export HF_HOME="/vast/users/sraskar/mi250/hf"
export HF_DATASETS_CACHE="/vast/users/sraskar/mi250/hf"
export TRANSFORMERS_CACHE="/vast/users/sraskar/mi250/hf"

# install ARM64 specific wheels for dependencies
cd /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels
pip install --no-deps --find-links /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels flash-attn==2.6.1
pip install --no-index --no-deps --find-links /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels vllm-flash-attn==2.5.9.post1
pip install --no-deps --find-links /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels xformers==0.0.27
pip install --no-deps --find-links /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels megablocks==0.5.1
pip install --no-index --no-deps --find-links /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels bitsandbytes==0.43.2.dev0
pip install --no-deps --find-links /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels vllm==0.5.3.post1
pip install py3nvml

cd /vast/users/sraskar/gh200/llm_research/vllm/benchmarks/

models=(
"meta-llama/Llama-2-7b-hf"
"meta-llama/Meta-Llama-3-8B"
"meta-llama/Llama-2-70b-hf"
"meta-llama/Meta-Llama-3-70B"
"mistralai/Mistral-7B-v0.1"
"mistralai/Mixtral-8x7B-v0.1"
"Qwen/Qwen2-7B"
"Qwen/Qwen2-72B"
)

for model in "${models[@]}"; do
    for tensor_parallel in 1; do
        for batch_size in 1 16 32 64; do
            for input_output_length in 128 256 512 1024 2048; do
                python3 benchmark_power.py --device cuda --model=$model --tensor-parallel-size=$tensor_parallel --input-len=$input_output_length --output-len=$input_output_length --batch-size=$batch_size --dtype="float16" --trust-remote-code
            done
        done
    done
done

