# LLaMA-Inference-Bench
 
LLM-Inference-Bench: Inference Benchmarking of Large Language Models on AI Accelerators

## Metrix of Evaluated Frameworks and Hardwares :

| Framework/ Hardware | NVIDIA A100 | NVIDIA H100 | NVIDIA GH200 | AMD MI250 | Intel Max1550 | Habana Gaudi2 | Sambanova SN40L |
|:-----------------------:|:---------------:|:---------------:|:------------:|:---------:|:---------:|:-------------:|:---------------:|
|         [vLLM](./vLLM/README.md)        |     [Yes](./vLLM/A100/README.MD)    |     [Yes](./vLLM/H100/README.MD)    |      [Yes](./vLLM/GH200/README.MD)     |    [Yes](./vLLM/MI250/README.MD)   |    [Yes](./vLLM/PVC/README.md)   |       No      |       N/A       |
|      [llama.cpp](./llama.cpp/README.md)      |     [Yes](./llama.cpp/A100/README.MD)    |     [Yes](./llama.cpp/H100/README.MD)    |      [Yes](./llama.cpp/GH200/README.MD)     |    [Yes](./llama.cpp/MI250/README.MD)   |    [Yes](./llama.cpp/PVC/README.MD)   |      N/A      |       N/A       |
|     [TensorRT-LLM](./TensorRT-LLM/README.md)    |     [Yes](./TensorRT-LLM/A100/README.MD)    |     [Yes](./TensorRT-LLM/H100/README.MD)    |     [No]()     |    N/A    |    N/A    |      N/A      |       N/A       |
|      [DeepSpeed-MII](./Deepspeed-MII/README.md)      |      No     |      No     |      No      |     No    |     No    |      [Link]()     |       N/A       |
|      [Sambaflow](./Sambaflow/SN40L/README.md)      |      N/A     |      N/A     |      N/A      |     N/A    |     N/A    |      N/A     |       [Link](./Sambaflow/SN40L/README.md)       |



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

##### Acknowledgements

> This research used resources of the Argonne Leadership Computing Facility, a U.S. Department of Energy (DOE) Office of Science user facility at Argonne National Laboratory and is based on research supported by the U.S. DOE Office of Science-Advanced Scientific Computing Research Program, under Contract No. DE-AC02-06CH11357. We gratefully acknowledge the computing resources provided and operated by the Joint Laboratory for System Evaluation (JLSE) at Argonne National Laboratory.
