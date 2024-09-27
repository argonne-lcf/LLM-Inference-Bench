# vLLM on Intel Max 1550

## First time Setup

```bash

module use /opt/aurora/24.086.0/modulefiles
module load frameworks/2024.1

module use /soft/preview/pe/24.180.0-RC4/modulefiles
module load oneapi/release/2024.2.1
module use /soft/preview/pe/24.180.0-RC5/modulefiles
module switch intel_compute_runtime/release/950.13

# conda in the frameworks module contains an invalid channel configuration
conda config --set allow_non_channel_urls True
conda create -n vllm python=3.10 -y
conda activate vllm

pip install
torch==2.3.1+cxx11.abi
torchvision==0.18.1+cxx11.abi
torchaudio==2.3.1+cxx11.abi
intel-extension-for-pytorch==2.3.110+xpu
oneccl_bind_pt==2.3.100+xpu
--extra-index-url https://pytorch-extension.intel.com/release-whl/stable/xpu/us/

# clone vllm repo to desired location and build
git clone -b v0.5.2 https://github.com/vllm-project/vllm
cd vllm
pip install -r requirements-xpu.txt
VLLM_TARGET_DEVICE=xpu python3 setup.py install

export ZE_FLAT_DEVICE_HIERARCHY=FLAT

```


## Running a test Experiments 

```bash
python3 benchmark_latency.py --device xpu --model=meta-llama/Llama-2-7b-hf --tensor-parallel-size=1 --input-len=128 --output-len=128 --batch-size=16 --dtype=float16 --trust-remote-code
```

## Verify Execution 

```bash
> module load pti-gpu
> sysmon
=====================================================================================
GPU 0: Intel(R) Data Center GPU Max 1550    PCI Bus: 0000:18:00.0
Vendor: Intel(R) Corporation    Driver Version: 1.3.28202    Subdevices: 2
EU Count: 896    Threads Per EU: 8    EU SIMD Width: 16    Total Memory(MB): 124488.0
Core Frequency(MHz): 1600.0 of 1600.0    Core Temperature(C): 35.0
=====================================================================================
Running Processes: 2
     PID,  Device Memory Used(MB),  Shared Memory Used(MB),  GPU Engines, Executable
   45239,                 12983.8,                     0.0,  COMPUTE;DMA, python3
   59668,                     5.5,                     0.0,      UNKNOWN, sysmon
=====================================================================================
GPU 1: Intel(R) Data Center GPU Max 1550    PCI Bus: 0000:42:00.0
Vendor: Intel(R) Corporation    Driver Version: 1.3.28202    Subdevices: 2
EU Count: 896    Threads Per EU: 8    EU SIMD Width: 16    Total Memory(MB): 124488.0
Core Frequency(MHz): 1600.0 of 1600.0    Core Temperature(C): 41.0
=====================================================================================
Running Processes: 2
     PID,  Device Memory Used(MB),  Shared Memory Used(MB),  GPU Engines, Executable
   45239,                     6.8,                     0.0,  COMPUTE;DMA, python3
   59668,                     5.5,                     0.0,      UNKNOWN, sysmon
=====================================================================================
GPU 2: Intel(R) Data Center GPU Max 1550    PCI Bus: 0000:6c:00.0
Vendor: Intel(R) Corporation    Driver Version: 1.3.28202    Subdevices: 2
EU Count: 896    Threads Per EU: 8    EU SIMD Width: 16    Total Memory(MB): 124488.0
Core Frequency(MHz): 1600.0 of 1600.0    Core Temperature(C): 36.0
=====================================================================================
Running Processes: 2
     PID,  Device Memory Used(MB),  Shared Memory Used(MB),  GPU Engines, Executable
   45239,                     6.8,                     0.0,  COMPUTE;DMA, python3
   59668,                     5.5,                     0.0,      UNKNOWN, sysmon
=====================================================================================
GPU 3: Intel(R) Data Center GPU Max 1550    PCI Bus: 0001:18:00.0
Vendor: Intel(R) Corporation    Driver Version: 1.3.28202    Subdevices: 2
EU Count: 896    Threads Per EU: 8    EU SIMD Width: 16    Total Memory(MB): 124488.0
Core Frequency(MHz): 1600.0 of 1600.0    Core Temperature(C): 38.0
=====================================================================================
Running Processes: 2
     PID,  Device Memory Used(MB),  Shared Memory Used(MB),  GPU Engines, Executable
   45239,                     6.8,                     0.0,  COMPUTE;DMA, python3
   59668,                     5.5,                     0.0,      UNKNOWN, sysmon
=====================================================================================
GPU 4: Intel(R) Data Center GPU Max 1550    PCI Bus: 0001:42:00.0
Vendor: Intel(R) Corporation    Driver Version: 1.3.28202    Subdevices: 2
EU Count: 896    Threads Per EU: 8    EU SIMD Width: 16    Total Memory(MB): 124488.0
Core Frequency(MHz): 1600.0 of 1600.0    Core Temperature(C): 42.0
=====================================================================================
Running Processes: 2
     PID,  Device Memory Used(MB),  Shared Memory Used(MB),  GPU Engines, Executable
   45239,                     6.8,                     0.0,  COMPUTE;DMA, python3
   59668,                     5.5,                     0.0,      UNKNOWN, sysmon
=====================================================================================
GPU 5: Intel(R) Data Center GPU Max 1550    PCI Bus: 0001:6c:00.0
Vendor: Intel(R) Corporation    Driver Version: 1.3.28202    Subdevices: 2
EU Count: 896    Threads Per EU: 8    EU SIMD Width: 16    Total Memory(MB): 124488.0
Core Frequency(MHz): 1600.0 of 1600.0    Core Temperature(C): 36.0
=====================================================================================
Running Processes: 2
     PID,  Device Memory Used(MB),  Shared Memory Used(MB),  GPU Engines, Executable
   45239,                     6.8,                     0.0,  COMPUTE;DMA, python3
   59668,                     5.5,                     0.0,      UNKNOWN, sysmon
```

This show execution on single GPU (both tiles)

## Run Benchmarks 

* Replace `benchmark_latency.py` file with the one in this directory to output the results in `csv` files. 
* Use provided shell script `run-bench.sh` in this directory to run `benchmark_latency.py` for various configurations of input, output lengths and batch sizes. 

```bash
source run-bench.sh
```