# vLLM on AMD MI300X

## First time Setup

1. Clone vllm repo
```bash
git clone https://github.com/vllm-project/vllm.git
cd vllm
git checkout v0.6.1

```

2. Build a docker container. 
```bash
DOCKER_BUILDKIT=1 docker build -f Dockerfile.rocm -t vllm-rocm .
```


## Run Benchmarks 

1. Run docker container 
    ```bash
    docker run -it \
        --network=host \
        --group-add=video \
        --ipc=host \
        --cap-add=SYS_PTRACE \
        --security-opt seccomp=unconfined \
        --device /dev/kfd \
        --device /dev/dri \
        -v /home/test/sraskar/huggingface/:/huggingface/ \
        -v /home/test/sraskar/:/home/test/sraskar/ \
        vllm-rocm \
        bash
    ```

2. Use provided shell script `run-benchmark.sh` in this directory to run `benchmark_throughput.py` for various configurations of input, output lengths and batch sizes. 



