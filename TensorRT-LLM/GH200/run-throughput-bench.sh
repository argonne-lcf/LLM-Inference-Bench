cd /vast/users/sraskar/gh200/llm_research/TensorRT-LLM-0.12.0/examples/llama/

export HF_TOKEN="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"
export HF_HOME="/vast/users/sraskar/mi250/hf/hub"
export HF_DATASETS_CACHE="/vast/users/sraskar/mi250/hf/hub"

model_name=meta-llama/Llama-2-7b-hf
dir_1="/vast/users/sraskar/mi250/hf/hub/models--meta-llama--Llama-2-7b-hf/snapshots/01c7f73d771dfac7d292323805ebc428287df4f9/"
dir_2="/vast/users/sraskar/gh200/trt_weights/checkpoint/llama2-7b"
dir_3="/vast/users/sraskar/gh200/trt_weights/compiled_weights/llama2-7b"


for tensor_parallel in 1; do
    for precision in "float16"; do
        rm -rf $dir_2/*
        rm -rf $dir_3/*
        python convert_checkpoint.py --tp_size=$tensor_parallel --model_dir=$dir_1 --output_dir=$dir_2 --dtype=$precision
        for batch_size in 16 32 64; do
            for input_output_length in 1024; do
                trtllm-build --checkpoint_dir=$dir_2 --output_dir=$dir_3 --gemm_plugin=$precision --gpt_attention_plugin=$precision --max_batch_size=$batch_size --max_input_len=$input_output_length
                python3 ../run.py --model_name=$model_name --tp_size=$tensor_parallel --tokenizer_dir=$dir_1 --engine_dir=$dir_3 --max_output_len=1 --max_input_length=$input_output_length --run_profiling --batch_size=$batch_size 
            done
        done
    done
done

model_name=meta-llama/Meta-Llama-3-8B
dir_1="/vast/users/sraskar/mi250/hf/hub/models--meta-llama--Meta-Llama-3-8B/snapshots/62bd457b6fe961a42a631306577e622c83876cb6/"
dir_2="/vast/users/sraskar/gh200/trt_weights/checkpoint/Meta-Llama-3-8B"
dir_3="/vast/users/sraskar/gh200/trt_weights/compiled_weights/Meta-Llama-3-8B"

for tensor_parallel in 1; do
    for precision in "float16"; do
        rm -rf $dir_2/*
        rm -rf $dir_3/*
        python convert_checkpoint.py --tp_size=$tensor_parallel --model_dir=$dir_1 --output_dir=$dir_2 --dtype=$precision
        for batch_size in 16 32 64; do
            for input_output_length in 1024; do
                trtllm-build --checkpoint_dir=$dir_2 --output_dir=$dir_3 --gemm_plugin=$precision --gpt_attention_plugin=$precision --max_batch_size=$batch_size --max_input_len=$input_output_length
                python3 ../run.py --model_name=$model_name --tp_size=$tensor_parallel --tokenizer_dir=$dir_1 --engine_dir=$dir_3 --max_output_len=1 --max_input_length=$input_output_length --run_profiling --batch_size=$batch_size 
            done
        done
    done
done

model_name=mistralai/Mistral-7B-v0.1
dir_1="/vast/users/sraskar/mi250/hf/hub/models--mistralai--Mistral-7B-v0.1/snapshots/f9824c3c1090baa2f7c1d33ddc89becab37b3e18/"
dir_2="/vast/users/sraskar/gh200/trt_weights/checkpoint/Mistral-7B-v0.1"
dir_3="/vast/users/sraskar/gh200/trt_weights/compiled_weights/Mistral-7B-v0.1"

for tensor_parallel in 1; do
    for precision in "float16"; do
        rm -rf $dir_2/*
        rm -rf $dir_3/*
        python convert_checkpoint.py --tp_size=$tensor_parallel --model_dir=$dir_1 --output_dir=$dir_2 --dtype=$precision
        for batch_size in 16 32 64; do
            for input_output_length in 1024; do
                trtllm-build --checkpoint_dir=$dir_2 --output_dir=$dir_3 --gemm_plugin=$precision --gpt_attention_plugin=$precision --max_batch_size=$batch_size --max_input_len=$input_output_length
                python3 ../run.py --model_name=$model_name --tp_size=$tensor_parallel --tokenizer_dir=$dir_1 --engine_dir=$dir_3 --max_output_len=1 --max_input_length=$input_output_length --run_profiling --batch_size=$batch_size 
            done
        done
    done
done