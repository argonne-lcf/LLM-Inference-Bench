# LLM-Inference-Bench: Inference Benchmarking of Large Language Models on AI Accelerators

**Authors:** Krishna Teja Chitty-Venkata, Siddhisanket Raskar, Bharat Kale, Farah Ferdaus, Aditya Tanikanti, Ken Raffenetti, Valerie Taylor, Murali Emani, Venkatram Vishwanath

**Affliation:** Argonne National Laboratory

This repository is the official implementation of ["LLM-Inference-Bench"](https://arxiv.org/pdf/2411.00136) paper 


## Table of Contents

- [About](#-about)
- [Metrix](#metrix-of-evaluated-frameworks-and-hardwares-)
- [Features](#metrix-of-evaluated-frameworks-and-hardwares-)
- [Evaluated Llms](#evaluated-llms)
- [Dashboard](#dashboard)
- [Citation](#-citation)
- [Acknowledgement](#acknowledgements)


## 📌 About
Large Language Models (LLMs) have propelled
groundbreaking advancements across several domains and are
commonly used for text generation applications. However, the
computational demands of these complex models pose significant
challenges, requiring efficient hardware acceleration. Benchmarking the performance of LLMs across diverse hardware
platforms is crucial to understanding their scalability and
throughput characteristics. We introduce LLM-Inference-Bench,
a comprehensive benchmarking suite to evaluate the hardware
inference performance of LLMs. We thoroughly analyze diverse
hardware platforms, including GPUs from Nvidia and AMD
and specialized AI accelerators, Intel Habana and SambaNova.
Our evaluation includes several LLM inference frameworks and
models from LLaMA, Mistral, and Qwen families with 7B and
70B parameters. Our benchmarking results reveal the strengths
and limitations of various models, hardware platforms, and
inference frameworks. We provide an interactive dashboard to
help identify configurations for optimal performance for a given
hardware platform.



## Metrix of Evaluated Frameworks and Hardwares :

| Framework/ Hardware | NVIDIA A100 | NVIDIA H100 | NVIDIA GH200 | AMD MI250 | AMD MI300X | Intel Max1550 | Habana Gaudi2 | Sambanova SN40L |
|:-----------------------:|:---------------:|:---------------:|:------------:|:---------:|:---------:|:-------------:|:---------------:|:----------------:|
|         [vLLM](./vLLM/)        |     [Yes](./vLLM/A100/)    |     [Yes](./vLLM/H100/)    |      [Yes](./vLLM/GH200/)     |    [Yes](./vLLM/MI250/)   | [Yes](./vLLM/MI300X/) |   [Yes](./vLLM/Max1550/)   |       No      |       N/A       |
|      [llama.cpp](./llama.cpp/)      |     [Yes](./llama.cpp/A100/)    |     [Yes](./llama.cpp/H100/)    |      [Yes](./llama.cpp/GH200/)     |    [Yes](./llama.cpp/MI250/)   |    [Yes](./llama.cpp/MI300X/) | [Yes](./llama.cpp/Max1550/)   |      N/A      |       N/A       |
|     [TensorRT-LLM](./TensorRT-LLM/)    |     [Yes](./TensorRT-LLM/A100/)    |     [Yes](./TensorRT-LLM/H100/)    |     [Yes](./TensorRT-LLM/GH200/)     |    N/A | N/A    |    N/A    |      N/A      |       N/A       |
|      [DeepSpeed-MII](./Deepspeed-MII/)      |      [Yes](./Deepspeed-MII/A100/)     |      No     |      No      |     No    |     No | No    |      [Yes](./Deepspeed-MII/Gaudi2/)     |       N/A       |
|      [Sambaflow](./Sambaflow/)      |      N/A     |      N/A     |      N/A      |     N/A    |     N/A | N/A    |      N/A     |       [Yes](./Sambaflow/SN40L/)       |



 
## Evaluated LLMs

| Models |   |
|-----------------------------------------------------------------------------------|----------------------------------------|
| LLaMA-2-7B | LLaMA-2-70B |
| LLaMA-3-8B | LLaMA-3-70B |
| Mistral-7B | Mixtral-8x7B |
| Qwen2-7B | Qwen2-72B |
 
## Dashboard
Please find our results dashboard to compare different LLMs, Inference Frameworks and Hardware for different batch sizes and input/output lengths [here](https://argonne-lcf.github.io/LLM-Inference-Bench/)  

## 📌 Citation
If you find this repository useful, please consider citing our paper:

```
@article{chitty2024llm,
  title={LLM-Inference-Bench: Inference Benchmarking of Large Language Models on AI Accelerators},
  author={Chitty-Venkata, Krishna Teja and Raskar, Siddhisanket and Kale, Bharat and Ferdaus, Farah and Tanikanti, Aditya and Raffenetti, Ken and Taylor, Valerie and Emani, Murali and Vishwanath, Venkatram},
  journal={arXiv preprint arXiv:2411.00136},
  year={2024}
}
```


##### Acknowledgements

> This research used resources of the Argonne Leadership Computing Facility, a U.S. Department of Energy (DOE) Office of Science user facility at Argonne National Laboratory and is based on research supported by the U.S. DOE Office of Science-Advanced Scientific Computing Research Program, under Contract No. DE-AC02-06CH11357. We gratefully acknowledge the computing resources provided and operated by the Joint Laboratory for System Evaluation (JLSE) at Argonne National Laboratory.
