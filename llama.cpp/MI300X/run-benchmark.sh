

for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/llama_2_7b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> llama2-7b.csv
            done
        done
    done
done

for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/llama_3_8b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> llama3-8b.csv
            done
        done
    done
done

for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/mistral_7b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> mistral-7b.csv
            done
        done
    done
done

for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/mixtral_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> mixtral.csv
            done
        done
    done
done


for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/qwen_2_7b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> qwen2-7b.csv
            done
        done
    done
done



for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/llama_2_70b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> llama2-70b.csv
            done
        done
    done
done


for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0" "0,1" "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/llama_3_70b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> llama3-70b.csv
            done
        done
    done
done



for batch_size in 1 16 32 64; do
    for input_length in 128 256 512 1024 2048; do
        for output_length in 128 256 512 1024 2048; do
            for CVD in "0,1,2,3" "0,1,2,3,4,5,6,7";do
                CUDA_VISIBLE_DEVICES=$CVD ./llama-bench -m /home/test/sraskar/GGUF_weights/qwen_2_72b_f16.gguf -p $input_length -n $output_length -pg $input_length,$output_length -b $batch_size -r 1 -o csv >> qwen2-72b.csv
            done
        done
    done
done