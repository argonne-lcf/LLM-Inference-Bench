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













1. Setup Virtual Environment 
    ```bash
    module load <necessary conda modules>

    conda create -n TensorRT_LLM_A100 python=3.11
    conda activate TensorRT_LLM_A100
    ```

2. Install dependencies 
    ```bash
    pip install -r requirements-cuda.txt
    ```

3. Update HF_TOKEN, HF_HOME, HF_DATASETS_CACHE in  benchmark_power.sh
    ```
    export HF_TOKEN=<HF Token>
    export HF_HOME=<>
    export HF_DATASETS_CACHE=<>

    ```

4. Customize model name, tensor parallel size, batch size, input and output size in  benchmark_power.sh
    ```
    model_name "meta-llama/Meta-Llama-3-8B" "meta-llama/Llama-2-7b-hf" "mistralai/Mistral-7B-v0.1" "Qwen/Qwen2-7B" 
    tensor_parallel 1 2 4
    batch_size in 1 16 32 64
    input_output_length in 128 256 512 1024 2048
    ```

5. Run LLMs on synthetic dataset
    ```
    bash benchmark_power.sh
    ```

6. View Results
    ```
    View end-to-end latency and throughput in power_benchmarking.csv
    ```



