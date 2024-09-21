# llama.cpp on MAD MI300X

## First time Setup

```bash
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp

# Cmake based build
cmake -S . -B build -DGGML_HIPBLAS=ON -DAMDGPU_TARGETS=gfx942 -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -- -j$(nproc)

```


## Running a test Experiment

```bash
cd llama.cpp/build/bin

#Sample Run for single GPU and input,output length 1024 with batch size 32
CUDA_VISIBLE_DEVICES=0 ./llama-bench -m /vast/users/sraskar/model_weights/GGUF_weights/llama_3_8b_f16.gguf -p 1024 -n 1024 -pg 1024,1024 -b 32 -r 1 -o csv

```
`CUDA_VISIBLE_DEVICES` is used to set number of GPUs.



## Run Benchmakrs 

Use provided shell scripts in this directory to run `llama-bench` for various configurations of input, output lengths and batch sizes. 


```bash
source run-benchmark.sh
```