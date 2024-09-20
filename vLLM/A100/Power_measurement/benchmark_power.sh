#!/bin/bash -l
#PBS -l select=1
#PBS -l filesystems=home:eagle:grand
#PBS -l walltime=30:00:00
#PBS -q preemptable
#PBS -A datascience

module use /soft/modulefiles/
module load conda
conda activate vllm

export TMPDIR="/lus/grand/projects/datascience/krishnat/tmp_dir/"
export RAY_TMPDIR='/tmp'

export HF_TOKEN=<HF Token>
export HF_HOME=<>
export HF_DATASETS_CACHE=<>


model_name="meta-llama/Meta-Llama-3-8B"
for tensor_parallel in 1 2 4; do
    for precision in "float16"; do
        for batch_size in 1 16 32 64; do
            for input_output_length in 128 256 512 1024 2048; do
                python3 benchmark_power.py --model=$model_name --tensor-parallel-size=$tensor_parallel --input-len=$input_output_length --output-len=$input_output_length --batch-size=$batch_size --dtype=$precision
            done
        done
    done
done