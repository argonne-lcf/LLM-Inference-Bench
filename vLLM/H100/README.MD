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

1. Use `benchmark_throughput.py` script provided here to collect throughput measurements in the respective `csv` file. 
2. Use `benchmark_power.py` script provided here to collect power measurements in the respective `csv` file. 
    > You will need `power_utils.py` file for power metric collectring in the same direcotry as the `benchmark_power.py`


### Collect Throughput Metric

* Use provided shell script `run-throughput.sh` in this directory to run `benchmark_throughput.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-throughput-bench.sh
```

### Collect Power Metric

* Use provided shell script `run-power.sh` in this directory to run `benchmark_power.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-power-bench.sh
```