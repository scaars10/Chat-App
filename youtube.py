from bs4 import BeautifulSoup
import urllib
import requests
import sys
# import webbrowser
#import text_speech
#import youtube_dl
#import os
#import small_methods
#home = '/Home/scaars13'
def get_top_result(topic):
	try:
		#text_speech.say("Finding "+topic)
		topic_url = topic.replace(' ','+')
		url = 'https://www.youtube.com/results?search_query='+topic_url
		r = requests.get(url)
		soup = BeautifulSoup(r.content, "html.parser")
		all_videos = soup.findAll('div', {'class': 'yt-lockup-video'})
		top_res = all_videos[0].find('a')['href']
		return top_res
	except:
		#text_speech.say("Error Occured while finding a match")
		return -1
# webbrowser.open('www.youtube.com')
# print(sys.argv[0]);
res = 'https://www.youtube.com'+get_top_result(sys.argv[1])
print(res)
sys.stdout.flush()
