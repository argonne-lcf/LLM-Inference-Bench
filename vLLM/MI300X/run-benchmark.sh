export HF_TOKEN="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"
export HF_HOME="/huggingface/"
export HF_DATASETS_CACHE="/huggingface/"

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
                python3 benchmark_throughput.py --device cuda --model=$model --tensor-parallel-size=$tensor_parallel --input-len=$input_output_length --output-len=$input_output_length --batch-size=$batch_size --dtype="float16" --trust-remote-code
            done
        done
    done
done

