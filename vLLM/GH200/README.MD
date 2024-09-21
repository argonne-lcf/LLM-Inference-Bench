# Benchmarking LLMs on Nvidia GH200 using vLLM

We utilized GH200 systems at JLSE testbeds at ALCF. We use apptainers to setup vLLM. 

## First time Setup


1. Build a container 
```bash
$ source build-container.sh
```
This script builds a apptainer image `vllm-gh200.def` using `vllm-gh200.sif` definition file in the same directory. 


## Run Benchmarks 

You will need `power_utils.py` file for power metric collectring in the same direcotry as the `benchmark_power.py`


### Collect Throughput Metric

* Use provided shell script `run-container-throughput.sh` in this directory to run container that runs `run-throughput-bench.sh` to invoke `benchmark_throughput.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-container-throughput.sh
```

### Collect Power Metric

* Use provided shell script `run-container-throughput.sh` in this directory to run container that runs `run-power-bench.sh` to invoke `benchmark_power.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-container-power.sh
```