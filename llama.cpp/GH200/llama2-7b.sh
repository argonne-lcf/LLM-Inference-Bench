cd /llama.cpp/

for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
                ./llama-bench -m /vast/users/sraskar/model_weights/GGUF_weights/llama_2_7b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv
        done
    done
done