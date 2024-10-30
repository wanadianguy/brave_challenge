import json
from bs4 import BeautifulSoup
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from dotenv import load_dotenv
import os

from data.industries import industries

if (os.getenv("ENV") == "production"):
	load_dotenv("env_variables/.env.prod")
else:
	load_dotenv("env_variables/.env.local")

database = MongoClient(os.getenv("MONGO_HOST")).flask_db.answers

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

def save_answers(answers):
	return database.insert_one(answers)
