# Deepspeed on Intel Habana Gaudi2 

We utilized Gaudi2 systems In Intel Developer Cloud. 


## Build Container
```bash
   docker pull vault.habana.ai/gaudi-docker/1.17.1/{$OS}/habanalabs/pytorch-installer-2.3.1:latest
```

## Run Container 

```bash
    docker run -it -v /home/sdp:/home/sdp --runtime=habana -e HABANA_VISIBLE_DEVICES=all -e OMPI_MCA_btl_vader_single_copy_mechanism=none --cap-add=sys_nice --net=host --ipc=host vault.habana.ai/gaudi-docker/1.16.0/ubuntu22.04/habanalabs/pytorch-installer-2.2.2:latest
```



## Run Benchmarks 

1. Clone optimum-habana repo and go to correct direcotry.
```bash
    git clone https://github.com/huggingface/optimum-habana.git
    cd examples/text-generation
```
2. Replace `run_generation.py` file with the one in this directory. 
3. Copy `run_generation_power.py` and `habana_power.py` from this directory to text generation directory. 

### Collect Throughput Metric

* Use provided shell script `run-throughput-bench.sh` in this directory to run `run_generation.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-throughput-bench.sh
```

### Collect Power Metric

* Use provided shell script `run-power-bench.sh` in this directory to run `run_generation_power.py` for various configurations of input, output lengths and batch sizes. 

```bash
    source run-power-bench.sh
```