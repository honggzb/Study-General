import shutil
import sys
from datetime import datetime
from gradio_client import Client, handle_file

# 获取命令行传入的文本
if len(sys.argv) < 2:
    print("请传入要合成的文本，例如：python script.py \"你好，世界！\"")
    sys.exit(1)

text = sys.argv[1]

# 当前时间格式化为文件名
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
output_filename = f"cloned_voice_{timestamp}.wav"

# 初始化客户端
client = Client("mrfakename/E2-F5-TTS")

# 发起预测请求
result = client.predict(
    handle_file("/home/node/demo3.wav"),
    "",  # 可留空
    text,
    False,    # 是否去吃参考音频中的静音段，设为true有助于提取跟纯净的语音特征
    0.15,     # 控制帧之间的过渡混合时间，过大可能会导致模糊和回音感，推荐在0.08-0.15之间
    32,       # 推理步骤数(Number ofForward evaluation steps)，越大越清晰但速度越慢，推荐32-64
    1.0,      # 语速， 1.0 表示正常速度
    api_name="/basic_tts"
)

audio_path, spectrogram_url, transcript = result

# 保存音频文件
shutil.copy(audio_path, output_filename)

print(f"语音克隆完成，已保存为 {output_filename}")
print("实际参考转录：", transcript)
