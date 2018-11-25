"""pip install newspaper for python2
	pip install newspaper3k for python3
	issues while installing it on ubuntu python2
	For Ubuntu:-  sudo apt-get install libxml2-dev libxslt-dev
	sudo apt-get install libjpeg-dev zlib1g-dev libpng12-dev
	use libpng-dev if libpng12-dev fails"""
import requests
from bs4 import BeautifulSoup
#import web_browser
#from newspaper import Article
import sys
#import location
#import text_speech


def get_news(topic):
	query = topic.replace(' ','+')
	link = "https://www.bing.com/news/search?q="+query+"&FORM=HDRSC6"
	r = requests.get(link)
	soup = BeautifulSoup(r.content,'html.parser')
	#print(soup.prettify())
	news_elements = soup.find_all("a",class_="title")
	"""element_url = soup.find_all("a")
	for url in element_url:
		print(url)"""
	num_links = len(news_elements)
	if(num_links<1):
		print("Could not find any news")
		return -1
	"""for element in news_elements:
		print(str(element))"""
	itr=0
	arr = [];
	# text_speech.say("Opening news about "+topic+" in your browser")
	while((itr<3) and (itr<num_links)):
		news_url = news_elements[itr]["href"]
		print(news_url)
		arr.append(news_url);
		"""article  = Article(news_url)
		article.download()
		article.parse()
		print(article.title)
		summary = str(article.summary)
		print(len(summary))
		itr+=1"""
		itr+=1
		# web_browser.open_link(news_url)
	print(arr);
# def get_local_news():
# 	loc = location.get_city()
# 	if(loc=="-1"):
# 		return -1
# 	get_news(loc)
#get_local_news()
get_news(sys.argv[1]);
sys.stdout.flush();
