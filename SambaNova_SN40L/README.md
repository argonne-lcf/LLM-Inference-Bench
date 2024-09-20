# Benchmarking LLMs on SN40L (Cloud Sevice Provider)


1. Setup Virtual Environment 

    ```bash
    module load <necessary conda modules>

    conda create -n SN40L python=3.11
    conda activate SN40L
    ```

2. Clone the ai-starter-kit 

    ```bash
    git clone https://github.com/sambanova/ai-starter-kit.git
    ```

3. Install dependencies 

    ```bash
    cd benchmarking
    pip install -r requirements.txt
    ```

4. Create .env file

    ```
    - Create the `.env` file at `ai-starter-kit/.env`
    ```

5. Set .env file

    ```
    SAMBASTUDIO_BASE_URL="https://sjc3-e3.sambanova.net"
    SAMBASTUDIO_BASE_URI="api/predict/generic"
    SAMBASTUDIO_PROJECT_ID="ee2686ad-fd8a-4d37-a366-6d354230fe85"
    SAMBASTUDIO_ENDPOINT_ID="f9920ef5-8c80-42cf-b12f-4b56f559eeb5"
    SAMBASTUDIO_API_KEY="5bd2473f-0f1a-44f3-9252-d8b9b31b663c"
    ```


5. Run LLMs on synthetic datase

    ```
    bash run_synthetic_dataset.sh
    ```


5. View Results

    ```
    View end-to-end latency, TTFT in ./data/results/llmperf
    ```

