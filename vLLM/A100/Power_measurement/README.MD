# Benchmarking Power Consumption of LLMs on Nvidia A100 GPUs using vLLM


1. Setup Virtual Environment 
    ```bash
    module load <necessary conda modules>

    conda create -n vLLM_A100 python=3.11
    conda activate vLLM_A100
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



