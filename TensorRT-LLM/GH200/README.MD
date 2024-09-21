# Benchmarking LLMs on Nvidia GH200 using TensorRT-LLM

We utilized GH200 systems at JLSE testbeds at ALCF. We use apptainers to setup TensorRT-LLM. 

## First time Setup


1. Build a container 
```bash
$ source build-container.sh
```
This script builds a apptainer image `trt-llm-gh200.sif` using `trt-llm-gh200.def` definition file in the same directory. 


## Run Benchmarks 

1. You will need `power_utils.py` file for power metric collectring in the same direcotry as the `benchmark_power.py`
2. Clone TRT-LLM Repo
    ```bash
    git clone https://github.com/NVIDIA/TensorRT-LLM.git
    git checkout v0.12.0
    ```
3. Replace or Copy files `run_power.py`, `run_precision_bench.py`, `utils.py` and `run.py` from this directory to cloned trt-llm directory. 


### Collect Throughput Metric

* Use provided shell script `run-container-throughput.sh` in this directory to run container that runs `run-throughput-bench.sh` to invoke `run.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-container-throughput.sh
```

### Collect Power Metric

* Use provided shell script `run-container-power.sh` in this directory to run container that runs `run-power-bench.sh` to invoke `run_power.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-container-power.sh
```

### Collect precision Metric

* Use provided shell script `run-container-precision.sh` in this directory to run container that runs `run-precision-bench.sh` to invoke `run_precision.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-container-precision.sh
```