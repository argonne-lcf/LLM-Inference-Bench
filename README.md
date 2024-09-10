# LLaMA-Inference-Bench
 
LLM-Inference-Bench: Inference Benchmarking of Large Language Models on AI Accelerators

## Metrix of Evaluated Frameworks and Hardwares :

| Framework/ Hardware | NVIDIA A100 | NVIDIA H100 | NVIDIA GH200 | AMD MI250 | Intel PVC | Habana Gaudi2 | Sambanova SN40L |
|:-----------------------:|:---------------:|:---------------:|:------------:|:---------:|:---------:|:-------------:|:---------------:|
|         [vLLM](./vLLM/README.md)        |     [Yes](./vLLM/A100/README.MD)    |     [Yes](./vLLM/H100/README.MD)    |      [Yes](./vLLM/GH200/README.MD)     |    [Yes](./vLLM/MI250/README.MD)   |    [Yes](./vLLM/PVC/README.md)   |       No      |       N/A       |
|      [llama.cpp](./llama.cpp/README.md)      |     [Yes](./llama.cpp/A100/README.MD)    |     [Yes](./llama.cpp/H100/README.MD)    |      [Yes](./llama.cpp/GH200/README.MD)     |    [Yes](./llama.cpp/MI250/README.MD)   |    [Yes](./llama.cpp/PVC/README.MD)   |      N/A      |       N/A       |
|     [TensorRT-LLM](./TensorRT-LLM/README.md)    |     [Yes](./TensorRT-LLM/A100/README.MD)    |     [Yes](./TensorRT-LLM/H100/README.MD)    |     [No]()     |    N/A    |    N/A    |      N/A      |       N/A       |
|      [DeepSpeed-MII](./Deepspeed-MII/README.md)      |      No     |      No     |      No      |     No    |     No    |      [Link]()     |       N/A       |

## Key Insights 


 Cite this work:
 ```
 @INPROCEEDINGS{####,
  author={Krishna Teja Chitty-Venkata and Siddhisanket Raskar and Bharat Kale and Farah Ferdaus and Aditya Tanikanti and Ken Raffenetti and Valerie Taylor and Murali Emani and Venkatram Vishwanath},
  booktitle={2024 IEEE/ACM International Workshop on Performance Modeling, Benchmarking and Simulation of High Performance Computer Systems (PMBS)}, 
  title={LLM-Inference-Bench: Inference Benchmarking of Large Language Models on AI Accelerators}, 
  year={2024},
  volume={},
  number={},
  pages={},
  keywords={Large Language Models, AI Accelerators, Performance Evaluation, Benchmarking },
  doi={}}
 ```
