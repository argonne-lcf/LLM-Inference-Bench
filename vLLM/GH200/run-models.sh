export HF_TOKEN="your_hugging_face_token"
export HF_HOME="/hf"
export HF_DATASETS_CACHE="/hf"


source /vast/users/sraskar/gh200/llm_research/container-build/vllm/wheels/setup_wheels.sh
cd /vast/users/sraskar/gh200/llm_research/vllm/benchmarks/

for model_name in "meta-llama/Meta-Llama-3-8B";do
    for tensor_parallel in 1; do
        for batch_size in 1 16 32 64; do
            for input_output_length in 128 256 512 1024 2048; do
                python3 benchmark_throughput_power_gh200.py --device cuda --model=$model_name --tensor-parallel-size=$tensor_parallel --input-len=$input_output_length --output-len=$input_output_length --batch-size=$batch_size --dtype="float16" --trust-remote-code
            done
        done
    done
done

