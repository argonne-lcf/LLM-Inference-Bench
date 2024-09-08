# TRT-LLM on H100

1. Setup Virtual Environment 

    ```bash
    module use /soft/modulefiles/
    module load conda
    module load openmpi/4.1.1-nvhpc

    conda create -n TensorRT_LLM python=3.10
    conda activate TensorRT_LLM
    conda install -c conda-forge mpi4py openmpi

    ```

2. Install Dependancies
    ```bash
    git clone https://github.com/NVIDIA/TensorRT-LLM.git

    cd TensorRT-LLM
    cd examples/llama/

    MPICC=$(which mpicc) MPICXX=$(which mpicxx) pip install -r requirements.txt
    ```

3. Running single Benchmark
   ```bash

    export dir_1=<HF weights path>
    export dir_2=<trt weights path>
    export dir_3=<trt engines path>

    python convert_checkpoint.py --tp_size=1 --model_dir=$dir_1 --output_dir=$dir_2 --dtype=float16

    trtllm-build --checkpoint_dir=$dir_2 --output_dir=$dir_3 --gemm_plugin=float16 --max_batch_size=1 --max_input_len=128 --max_output_len=128

    python3 ../run.py --model_name="mistral_7b" --tokenizer_dir=$dir_1 --engine_dir=$dir_3 --max_output_len=128 --max_input_length=$input_output_length --run_profiling --batch_size=1 
   ```

4. Replaces or Copy files `run_power.py`, `run_precision_bench.py`, `utils.py` and `run.py` from this directory to clones trt-llm directory. 

5. Run benchmarks. 
Use `p-llama2-7b.sh` to run power benchmakrs. 
Use `q-llama2-7b.sh` to run precision benchmarks. 












