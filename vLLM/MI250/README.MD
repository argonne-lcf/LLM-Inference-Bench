# vLLM on AMD MI250

## First time Setup

1. Clone vllm repo
```bash
git clone https://github.com/vllm-project/vllm.git
cd vllm
git checkout v0.6.1

```

2. Build a docker container and convert it to apptainer container. 
```bash
DOCKER_BUILDKIT=1 docker build -f Dockerfile.rocm -t vllm-rocm .
apptainer build vllm-rocm docker://raskar/vllm-rocm
```


## Run Benchmarks 


1. Use provided shell script `run-container.sh` in this directory to run `run-throughput-bench.py` for various configurations of input, output lengths and batch sizes. 

```bash
    qsub run-container.sh
```

