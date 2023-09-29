# # pip install -q youtube_transcript_api
# # pip install -q transformers

from transformers import pipeline
from youtube_transcript_api import YouTubeTranscriptApi
import sys


# print("fun started")
# print(sys.argv[1])
youtube_video = sys.argv[1]

video_id = youtube_video.split("=")[1]

video_id

# from IPython.display import YouTubeVideo
# YouTubeVideo(video_id)

YouTubeTranscriptApi.get_transcript(video_id)
transcript = YouTubeTranscriptApi.get_transcript(video_id)

transcript[0:5]

result = ""
for i in transcript:
    result += " " + i["text"]
# print(result)
print(len(result))

summarizer = pipeline("summarization")

num_iters = int(len(result) / 1000)
summarized_text = []
input_text = []
for i in range(0, num_iters + 1):
    start = 0
    start = i * 1000
    end = (i + 1) * 1000
    # print("input text \n" + result[start:end])
    input_text.append(result[start:end])

    out = summarizer(result[start:end])
    out = out[0]
    out = out["summary_text"]
    # print("Summarized text\n" + out)
    summarized_text.append(out)

# print(summarized_text)
print(str(input_text))
print("&&&")
print(len(str(summarized_text)))
print("&&&")
print(str(summarized_text))
