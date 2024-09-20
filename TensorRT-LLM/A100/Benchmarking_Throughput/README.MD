# Benchmarking LLM Throughput on Nvidia A100 GPUs using TensorRT-LLM

1. Setup Virtual Environment 

    ```bash
    module load <conda releated modules>

    conda create -n TensorRT_LLM python=3.10
    conda activate TensorRT_LLM
    conda install -c conda-forge mpi4py openmpi
    ```

2. Install Dependancies
    ```bash
    MPICC=$(which mpicc) MPICXX=$(which mpicxx) pip install -r requirements.txt
    ```

3. Running single Benchmark
   ```bash

    export dir_1=<HF Weights and Tokenizer Path>
    export dir_2=<trt Weights path>
    export dir_3=<trt Engines path>

    python convert_checkpoint.py --tp_size=1 --model_dir=$dir_1 --output_dir=$dir_2 --dtype=float16

    trtllm-build --checkpoint_dir=$dir_2 --output_dir=$dir_3 --gemm_plugin=float16 --max_batch_size=1 --max_input_len=128

    python3 run.py --model_name="mistral_7b" --tokenizer_dir=$dir_1 --engine_dir=$dir_3 --max_output_len=128 --max_input_length=$input_output_length --run_profiling --batch_size=1 
   ```

4. Replaces or Copy files `run_power.py`, `run_precision_bench.py`, `utils.py` and `run.py` from this directory to clones trt-llm directory. 

5. Run benchmarks. 
Use `p-llama2-7b.sh` to run power benchmakrs. 
Use `q-llama2-7b.sh` to run precision benchmarks. 

