pip install -r requirements.txt
pip install git+https://github.com/HabanaAI/DeepSpeed.git@1.16.0
pip install --upgrade-strategy eager optimum[habana]

export HF_TOKEN="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"

export HF_DATASETS_CACHE="/scratch-1/hf"
export HF_HOME="/scratch-1/hf"

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
    for batch_size in 1 16 32 64; do
        for input_output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                HABANA_VISIBLE_MODULES=$CVD python ../gaudi_spawn.py --use_deepspeed --world_size 1 run_generation.py \
                --model_or_path $model \
                --batch_size $batch_size \
                --use_hpu_graphs \
                --max_new_tokens $input_output_length \
                --max_input_tokens $input_output_length \
                --world_size 1 \
                --n_iterations 1
            done
        done
    done
done



