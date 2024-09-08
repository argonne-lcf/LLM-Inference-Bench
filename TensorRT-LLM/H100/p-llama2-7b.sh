export HF_TOKEN="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"
export HF_HOME="/vast/users/sraskar/mi250/hf/hub"
export HF_DATASETS_CACHE="/vast/users/sraskar/mi250/hf/hub"

pip install pynvml==11.5.0
pip install pydantic-core==2.18.1
pip install psutil
pip install py3nvml

cd /vast/users/sraskar/h100/llm_research/tensorRT/new/TensorRT-LLM/examples/llama/

model_name="meta-llama/Llama-2-7b-hf"
dir_1="/vast/users/sraskar/mi250/hf/hub/models--meta-llama--Llama-2-7b-hf/snapshots/01c7f73d771dfac7d292323805ebc428287df4f9"
dir_2="/vast/users/sraskar/h100/llm_research/tensorRT/model_weights/TensorRT_weights/trt_weights/Llama2-7b"
dir_3="/vast/users/sraskar/h100/llm_research/tensorRT/model_weights/TensorRT_weights/trt_binaries/Llama2-7b"




for tensor_parallel in 1; do
    for precision in "float16"; do
        rm -rf $dir_2/*
        rm -rf $dir_3/*
        python convert_checkpoint.py --workers=64 --tp_size=$tensor_parallel --model_dir=$dir_1 --output_dir=$dir_2 --dtype=$precision
        for batch_size in 1 16 32 64; do
            for input_output_length in 1024; do
                trtllm-build --workers=64 --tp_size=$tensor_parallel --checkpoint_dir=$dir_2 --output_dir=$dir_3 --gemm_plugin=$precision --gpt_attention_plugin=$precision --max_batch_size=$batch_size --max_input_len=$input_output_length
                mpirun -np $tensor_parallel python3 ../run_power.py --model_name=$model_name --tp_size=$tensor_parallel --tokenizer_dir=$dir_1 --engine_dir=$dir_3 --max_output_len=$input_output_length --max_input_length=$input_output_length --run_profiling --batch_size=$batch_size 
            done
        done
    done
done