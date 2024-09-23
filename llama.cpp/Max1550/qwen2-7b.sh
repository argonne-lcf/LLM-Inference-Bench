#!/bin/bash
#PBS -l select=1
#PBS -A Aurora_deployment
#PBS -l walltime=02:00:00
#PBS -N qwen_2_7b_f16
#PBS -q workq-route

module load frameworks/2023.12.15.001
module load spack cmake

cd /gila/Aurora_deployment/sraskar/llm_research/llama.cpp/build/bin


for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3";do
                ZE_AFFINITY_MASK=$CVD ./llama-bench -m /gila/Aurora_deployment/sraskar/llm_research/model_weights/GGUF_weights/qwen_2_7b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv
            done
        done
    done
done

