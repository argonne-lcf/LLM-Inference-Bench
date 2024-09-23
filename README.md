# LLaMA-Inference-Bench
 
LLM-Inference-Bench: Inference Benchmarking of Large Language Models on AI Accelerators

## Metrix of Evaluated Frameworks and Hardwares :

| Framework/ Hardware | NVIDIA A100 | NVIDIA H100 | NVIDIA GH200 | AMD MI250 | AMD MI300X | Intel Max1550 | Habana Gaudi2 | Sambanova SN40L |
|:-----------------------:|:---------------:|:---------------:|:------------:|:---------:|:---------:|:-------------:|:---------------:|:----------------:|
|         [vLLM](./vLLM/)        |     [Yes](./vLLM/A100/)    |     [Yes](./vLLM/H100/)    |      [Yes](./vLLM/GH200/)     |    [Yes](./vLLM/MI250/)   | [Yes](./vLLM/MI300X/) |   [Yes](./vLLM/Max1550/)   |       No      |       N/A       |
|      [llama.cpp](./llama.cpp/)      |     [Yes](./llama.cpp/A100/)    |     [Yes](./llama.cpp/H100/)    |      [Yes](./llama.cpp/GH200/)     |    [Yes](./llama.cpp/MI250/)   |    [Yes](./llama.cpp/MI300X/) | [Yes](./llama.cpp/Max1550/)   |      N/A      |       N/A       |
|     [TensorRT-LLM](./TensorRT-LLM/)    |     [Yes](./TensorRT-LLM/A100/)    |     [Yes](./TensorRT-LLM/H100/)    |     [Yes](./TensorRT-LLM/GH200/)     |    N/A | N/A    |    N/A    |      N/A      |       N/A       |
|      [DeepSpeed-MII](./Deepspeed-MII/)      |      [Yes](./Deepspeed-MII/A100/)     |      No     |      No      |     No    |     No | No    |      [Yes](./Deepspeed-MII/Gaudi2/)     |       N/A       |
|      [Sambaflow](./Sambaflow/)      |      N/A     |      N/A     |      N/A      |     N/A    |     N/A | N/A    |      N/A     |       [Link](./Sambaflow/SN40L/)       |



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
