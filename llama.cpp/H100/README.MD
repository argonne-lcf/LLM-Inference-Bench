# llama.cpp on Nvidia H100

## First time Setup

```bash
module load cuda/12.3.0

git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp

# Cmake based build
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release

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
> nvidia-smi
Tue Sep 10 00:14:26 2024       
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 560.28.03              Driver Version: 560.28.03      CUDA Version: 12.6     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA H100 80GB HBM3          On  |   00000000:1C:00.0 Off |                    0 |
| N/A   37C    P0            304W /  700W |   15071MiB /  81559MiB |     83%      Default |
|                                         |                        |             Disabled |
+-----------------------------------------+------------------------+----------------------+
|   1  NVIDIA H100 80GB HBM3          On  |   00000000:2B:00.0 Off |                    0 |
| N/A   26C    P0             69W /  700W |       1MiB /  81559MiB |      0%      Default |
|                                         |                        |             Disabled |
+-----------------------------------------+------------------------+----------------------+
|   2  NVIDIA H100 80GB HBM3          On  |   00000000:AC:00.0 Off |                    0 |
| N/A   25C    P0             68W /  700W |       1MiB /  81559MiB |      0%      Default |
|                                         |                        |             Disabled |
+-----------------------------------------+------------------------+----------------------+
|   3  NVIDIA H100 80GB HBM3          On  |   00000000:BC:00.0 Off |                    0 |
| N/A   28C    P0             69W /  700W |       1MiB /  81559MiB |      0%      Default |
|                                         |                        |             Disabled |
+-----------------------------------------+------------------------+----------------------+
                                                                                         
+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A    148273      C   ./llama-bench                               15060MiB |
+-----------------------------------------------------------------------------------------+
```

This shows `./llama-bench` is executing on single GPU

## Run Benchmakrs 

Use provided shell scripts in this directory to run `llama-bench` for various configurations of input, output lengths and batch sizes. 
e.g. for running `llama2-7b` benchmakr. Use

```bash
source llama2-7b.sh
```