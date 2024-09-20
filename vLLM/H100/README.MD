# vLLM on H100

We utilized H100 GPU systems at JLSE testbeds at ALCF. 

## First time Setup

```bash

module load cuda/12.3.0
source ~/.init_conda_x86.sh
conda create -n vllm python=3.10
conda activate vllm

pip install vllm

```

## Running a test Experiment 

```bash
git clone https://github.com/vllm-project/vllm.git
cd vllm/benchmarks/

python benchmark_latency.py --batch-size=32 --tensor-parallel-size=1 --input-len=32--output-len=32 --model="meta-llama/Llama-2-7b-hf" --dtype="float16" --trust-remote-code
```

## Run Benchmarks 

* Replace `benchmark_latency.py` file with the one in this directory to output the results in `csv` files. 
* Use provided shell script `run-bench.sh` in this directory to run `benchmark_latency.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-bench.sh
```