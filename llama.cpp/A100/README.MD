# llama.cpp on Nvidia A100

## First time Setup

```bash

module use /soft/modulefiles/
module load conda/2024-04-29 
module load cuda-PrgEnv-nvidia/12.2.91 

git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp

# Cmake based build
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release

```


## Running Experiments 

```bash
cd llama.cpp/build/bin

#Sample Run for 2 GPUs and input,output length 1024 with batch size 32
CUDA_VISIBLE_DEVICES=0 ./llama-bench -m /vast/users/sraskar/model_weights/GGUF_weights/llama_3_8b_f16.gguf -p 1024 -n 1024 -pg 1024,1024 -b 32 -r 1 -o csv

```
`CUDA_VISIBLE_DEVICES` is used to set number of GPUs.

## Verify Execution 

```bash
> nvidia-smi

```

This show `./llama-bench` is executing on single GPU

## Run Benchmakrs 

Use provided shell scripts in this directory to run `llama-bench` for various configurations of input, output lengths and batch sizes. 
e.g. for running `llama2-7b` benchmakr. Use

```bash
source llama2-7b.sh
```