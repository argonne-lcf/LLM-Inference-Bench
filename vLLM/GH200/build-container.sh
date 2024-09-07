
# Obtain your credentials by following instructions at
# https://docs.nvidia.com/ngc/gpu-cloud/ngc-private-registry-user-guide/index.html
export SINGULARITY_DOCKER_USERNAME="$oauthtoken"
export SINGULARITY_DOCKER_PASSWORD=YOUR_PASSWORD
export APPTAINER_DOCKER_USERNAME="$oauthtoken"
export APPTAINER_DOCKER_PASSWORD=YOUR_PASSWORD

apptainer build vllm-gh200.sif vllm-gh200.def
