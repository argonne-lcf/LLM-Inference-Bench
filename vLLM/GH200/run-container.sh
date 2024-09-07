#!/bin/bash -l 
#COBALT -t 6:00:00 -n 1 -q gpu_gh200  --jobname v_7b-models

module use /soft/modulefiles/
module load conda/2024.03.04 
source /soft/datascience/miniconda3/bin/activate

apptainer exec --nv --no-mount /gpfs/jlse-fs0 \
    --bind /vast/users/sraskar/gh200/llm_research/:/vast/users/sraskar/gh200/llm_research/ \
    --bind /vast/users/sraskar/model_weights/GGUF_weights/:/vast/users/sraskar/model_weights/GGUF_weights \
    --bind /vast/users/sraskar/h100/tensorRT/trt_weights:/vast/users/sraskar/h100/tensorRT/trt_weights \
    --bind /vast/users/sraskar/mi250/hf:/vast/users/sraskar/mi250/hf vllm-gh200.sif \
    /vast/users/sraskar/gh200/llm_research/vllm/benchmarks/run-models.sh


