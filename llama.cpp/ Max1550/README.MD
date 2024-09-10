# llama.cpp on Intel PVC

## First time Setup

```bash

module load frameworks/2023.12.15.001
module load spack cmake

git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp

# Cmake based build
mkdir -p build
cd build
cmake .. -DLLAMA_SYCL=ON -DCMAKE_C_COMPILER=icx -DCMAKE_CXX_COMPILER=icpx -DLLAMA_SYCL_F16=ON
cmake --build . --config Release -v

```


## Running Experiments 

```bash
cd llama.cpp/build/bin

#Sample Run for 2 GPUs and input,output length 1024 with batch size 32
ZE_AFFINITY_MASK=0 ./llama-bench -m /gila/Aurora_deployment/sraskar/llm_research/model_weights/GGUF_weights/llama_2_7b_f16.gguf -p 1024 -n 1024 -pg 1024,1024 -b 32 -r 1 -o csv

```
`ZE_AFFINITY_MASK` is used to set number of GPUs.

## Verify Execution 

```bash
> module load pti-gpu
> sysmon
=====================================================================================
GPU 0: Intel(R) Data Center GPU Max 1550    PCI Bus: 0000:18:00.0
Vendor: Intel(R) Corporation    Driver Version: 1.3.28202    Subdevices: 2
EU Count: 896    Threads Per EU: 8    EU SIMD Width: 16    Total Memory(MB): 124488.0
Core Frequency(MHz): 1600.0 of 1600.0    Core Temperature(C): 38.0
=====================================================================================
Running Processes: 2
     PID,  Device Memory Used(MB),  Shared Memory Used(MB),  GPU Engines, Executable
  182858,                 13188.9,                     0.0,  COMPUTE;DMA, ./llama-bench
  182943,                     5.5,                     0.0,      UNKNOWN, sysmon
=====================================================================================
```

This show `./llama-bench` is executing on single GPU (both tiles)

## Run Benchmakrs 

Use provided shell scripts in this directory to run `llama-bench` for various configurations of input, output lengths and batch sizes. 
e.g. for running `llama2-7b` benchmakr. Use

```bash
source llama2-7b.sh
```