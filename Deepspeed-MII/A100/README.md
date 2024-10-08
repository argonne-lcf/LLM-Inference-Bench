# Deepspeed-MII on Nvidia A100


1. Build a Virtual Environment and activate it
```bash
$ module use /soft/modulefiles/
$ module load conda
$ conda create -n Deepspeed -y
$ conda activate Deepspeed
```

1. Install Requirements
```bash
$ pip3 install -r requirements.txt
$ pip install deepspeed-mii
$ conda install -y git cmake ninja
```


3. Specify GCC Versions, 
```bash
$ export CC=gcc-12
$ export CXX=g++-12
```

4. For Single GPU, 
```bash
$ python pipeline.py --model "mistralai/Mistral-7B-v0.1" --max-new-tokens=128 --max_input_length=128 --batch_size=16
```

5. For Multi GPU within the same node, 
```bash
$ deepspeed --num_gpus 2 python pipeline.py --model "mistralai/Mistral-7B-v0.1" --max-new-tokens=128 --max_input_length=128 --batch_size=16 --num_gpus 2
```