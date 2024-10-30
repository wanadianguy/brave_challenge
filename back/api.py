from flask import Flask, request, jsonify
from flask_cors import CORS
from services import scrape_content, get_industry, save_answers
from dotenv import load_dotenv
import os

from data.questions import questions

if (os.getenv("ENV") == "production"):
	load_dotenv("env_variables/.env.prod")
else:
	load_dotenv("env_variables/.env.local")

app = Flask("__main__")
cors = CORS(app)

# Endpoint: Classifies user's input input based on scraped content from the website and generates questions
@app.route('/questions', methods=['GET'])
def get_questions():
    try:
    	url = request.args["url"]
    except Exception as error:
    	return jsonify({"error": str(error)}), 400

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        content = scrape_content(url)
        industry = get_industry(content)

        industry_questions = questions[industry]

        return jsonify({
            "industry": industry,
            "questions": industry_questions
        }), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 500

@app.route('/answers', methods=['POST'])
def post_answers():
    if not request.data :
    	return jsonify({"error": "no data provided"}), 400

    try:
    	data = request.json
    except Exception as error:
    	return jsonify({"error": str(error)}), 400

    if not data :
    	return jsonify({"error": "no data provided"}), 400

    try:
        save_answers(data)
        return jsonify({"message": "data stored"}), 204
    except Exception as error:
        return jsonify({"error": str(error)}), 500

if __name__ == "__main__":
	print("Starting server")
	app.run(debug=True, host=os.getenv("HOST"), port=os.getenv("PORT"))
	print("Stoping server")
