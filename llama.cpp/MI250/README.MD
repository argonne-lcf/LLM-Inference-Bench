# llama.cpp on MAD MI250

## First time Setup

```bash
module load rocm/6.1.0
module load llvm/release-18.1.0

git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp

# Cmake based build
cmake -S . -B build -DLLAMA_HIPBLAS=ON -DAMDGPU_TARGETS=gfx90a -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -- -j 16

```


## Running Experiments 

```bash
cd llama.cpp/build/bin

#Sample Run for single GPU and input,output length 1024 with batch size 32
CUDA_VISIBLE_DEVICES=0 ./llama-bench -m /vast/users/sraskar/model_weights/GGUF_weights/llama_3_8b_f16.gguf -p 1024 -n 1024 -pg 1024,1024 -b 32 -r 1 -o csv

```
`CUDA_VISIBLE_DEVICES` is used to set number of GPUs.

## Verify Execution 

```bash
> rocm-smi 
========================================== ROCm System Management Interface ==========================================
==================================================== Concise Info ====================================================
Device  Node  IDs              Temp    Power   Partitions          SCLK     MCLK     Fan  Perf  PwrCap  VRAM%  GPU%  
              (DID,     GUID)  (Edge)  (Avg)   (Mem, Compute, ID)                                                    
======================================================================================================================
0       4     0x740c,   11743  33.0°C  96.0W   N/A, N/A, 0         800Mhz   1600Mhz  0%   auto  560.0W  0%     0%    
1       5     0x740c,   61477  34.0°C  N/A     N/A, N/A, 0         800Mhz   1600Mhz  0%   auto  0.0W    0%     0%    
2       2     0x740c,   58606  43.0°C  209.0W  N/A, N/A, 0         1700Mhz  1600Mhz  0%   auto  560.0W  23%    99%   
3       3     0x740c,   36660  27.0°C  N/A     N/A, N/A, 0         800Mhz   1600Mhz  0%   auto  0.0W    0%     0%    
4       8     0x740c,   28341  39.0°C  100.0W  N/A, N/A, 0         800Mhz   1600Mhz  0%   auto  560.0W  0%     0%    
5       9     0x740c,   30122  36.0°C  N/A     N/A, N/A, 0         800Mhz   1600Mhz  0%   auto  0.0W    0%     0%    
6       6     0x740c,   9668   31.0°C  100.0W  N/A, N/A, 0         800Mhz   1600Mhz  0%   auto  560.0W  0%     0%    
7       7     0x740c,   3258   34.0°C  N/A     N/A, N/A, 0         800Mhz   1600Mhz  0%   auto  0.0W    0%     0%    
======================================================================================================================
================================================ End of ROCm SMI Log =================================================
```

This shows `./llama-bench` is executing on single GPU

## Run Benchmakrs 

Use provided shell scripts in this directory to run `llama-bench` for various configurations of input, output lengths and batch sizes. 
e.g. for running `llama2-7b` benchmakr. Use

```bash
source llama2-7b.sh
```