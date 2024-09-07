# Setup vLLM on GH200

1. Build a container 
```bash
$ source build-container.sh
```

2. Run container.  
```bash
sourece run-container.sh
```
This will run the container and execute the `run-models.sh` script. 
  
3. Run models 
First `run-models.sh` will install the dependacnies by calling `wheels/setup_wheel.sh` script. It will run benchmakrs following it. 