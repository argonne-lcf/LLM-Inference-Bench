# Use your authetications tokens below
export SINGULARITY_DOCKER_USERNAME=""
export SINGULARITY_DOCKER_PASSWORD=
export APPTAINER_DOCKER_USERNAME=""
export APPTAINER_DOCKER_PASSWORD=

apptainer build --nv llama-cpp-gh200.sif llama-cpp-gh200.def
