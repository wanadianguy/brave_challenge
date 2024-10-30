from bs4 import BeautifulSoup
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from data.industries import industries

# Scrapes content from a website URL and returns extracted text
def scrape_content(url):
    response = requests.get(url)
    rawData = BeautifulSoup(response.text, 'html.parser')
    texts = [text.text for text in rawData.find_all({"div":{"class":"texts"}})]
    return ''.join(texts).replace("\n", "").replace(r"\n", "")

def get_industry(content):
    # Classifies content based on industry keywords
    vectorizer = TfidfVectorizer()
    industry_keywords = [" ".join(words) for words in industries.values()]
    vectors = vectorizer.fit_transform(industry_keywords + [content])

    # Computes cosine similarity with each industry
    similarities = cosine_similarity(vectors[-1], vectors[:-1])
    best_match = similarities.argmax()
    return list(industries.keys())[best_match]
