#!/bin/bash -l 
#COBALT -t 6:00:00 -n 1 -q gpu_amd_mi250  --jobname v_llama2-70b

module load rocm/6.1.0 
module load llvm/release-18.1.0

cd /vast/users/sraskar/mi250/llm_research/vllm-container

apptainer exec --no-mount /gpfs/jlse-fs0 \
    --bind /vast/users/sraskar/mi250/llm_research/vllm:/vllm \
    --bind /vast/users/sraskar/mi250/hf:/hf vllm-rocm \
    /vllm/benchmarks/run-throughput-bench.sh
