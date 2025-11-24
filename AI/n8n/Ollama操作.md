## Ollama创建嵌入模型

1. 创建最简Modelfile: `echo "FROM G:\\Ollama\\Qwen3-Embedding-4B-Q4_K_M.gguf" >> Modelfile`
   1. Download a model: `ollama pull Qwen3-Embedding`
   2. https://docs.ollama.com/cli#download-a-model
2. 创建模型： `ollama create Qwen3-Embedding -f Modelfile`
3. 使用Ollama原生API测试embedding：在window命令行(CMD)中，使用单引号包裹JSON数据会导致语法错误
   - `curl http://localhost:11434/api/embed -d "{\"model\":\"qwen3_embedding\",\"input\":\"Hello Qwen\"}"`
- https://hf-mirror.com/Qwen/Qwen3-Embedding-4B-GGUF/tree/main


## ollama serve Error: listen tcp 127.0.0.1:11434: bind: Only one usage of each socket address

1. `netstat -ano | findstr :11434`
2.  `taskkill /PID <PID> /F`
3. Instant solution, thanks! Just use http://host.docker.internal instead of http://localhost
