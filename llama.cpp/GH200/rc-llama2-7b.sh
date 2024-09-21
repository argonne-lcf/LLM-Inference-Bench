#!/bin/bash -l 
#COBALT -t 6:00:00 -n 1 -q gpu_gh200  --jobname c_llama2-7b


cd /vast/users/sraskar/gh200/llm_research/container-build/llama.cpp/

apptainer exec --nv --no-mount /gpfs/jlse-fs0 \
    --bind /vast/users/sraskar/gh200/llm_research/:/vast/users/sraskar/gh200/llm_research/ \
    --bind /vast/users/sraskar/model_weights/GGUF_weights/:/vast/users/sraskar/model_weights/GGUF_weights \
    --bind /vast/users/sraskar/mi250/hf:/vast/users/sraskar/mi250/hf llama-cpp-gh200.sif \
    /vast/users/sraskar/gh200/llm_research/container-build/llama.cpp/llama2-7b.sh
