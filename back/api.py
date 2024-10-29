from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

from consts import host, port
from data.questions import questions
from data.industries import industries

app = Flask("__main__")
cors = CORS(app)

# Scrapes content from a website URL and returns extracted text
def scrape_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    texts = [p.text for p in soup.find_all('p')]
    return ' '.join(texts)

def classify_industry(content):
    # Classifies content based on industry keywords
    vectorizer = TfidfVectorizer()
    industry_keywords = [" ".join(words) for words in industries.values()]
    vectors = vectorizer.fit_transform(industry_keywords + [content])

    # Compute cosine similarity with each industry
    similarities = cosine_similarity(vectors[-1], vectors[:-1])
    best_match = similarities.argmax()
    return list(industries.keys())[best_match]

@app.route('/classify', methods=['POST'])
def classify():
    # Main endpoint to classify user based on scraped content and generate questions
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        # Scrape and classify content
        content = scrape_content(url)
        industry = classify_industry(content)

        # Generate relevant questions
        industry_questions = questions.get(industry, [])

        return jsonify({
            "industry": industry,
            "questions": industry_questions
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
	print("Starting server")
	app.run(debug=True, host=host, port=port)
	print("Stoping server")
