#!/bin/bash -l 
#COBALT -t 6:00:00 -n 1 -q gpu_gh200  --jobname v_7b-models

module use /soft/modulefiles/
module load conda/2024.03.04 
source /soft/datascience/miniconda3/bin/activate

apptainer run --nv --no-mount /gpfs/jlse-fs0 \
    --bind /vast/users/sraskar/gh200/:/vast/users/sraskar/gh200/ \
    --bind /vast/users/sraskar/mi250/hf:/vast/users/sraskar/mi250/hf trt-llm-gh200.sif \
    /vast/users/sraskar/gh200/llm_research/TensorRT-LLM-0.12.0/examples/llama/run-throughput-bench.sh
