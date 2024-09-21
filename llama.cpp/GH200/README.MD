# Benchmarking LLMs on Nvidia GH200 using llama.cpp

We utilized GH200 systems at JLSE testbeds at ALCF. We use apptainers to setup llama.cpp 

## First time Setup


1. Build a container 
```bash
$ source build-container.sh
```
This script builds a apptainer image `llama-cpp-gh200.sif` using `llama-cpp-gh200.def` definition file in the same directory. 


## Run Throughput Benchmarks 

* Use provided shell script `rc-llama2-7b.sh` in this directory to run container that runs `llama2-7b.sh` to invoke `llama-bench` for various configurations of input, output lengths and batch sizes. 

```bash
    qsub rc-llama2-7b.sh
```
> Write similar scripts for other llama-like models to benchmark.