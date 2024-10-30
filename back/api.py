from flask import Flask, request, jsonify
from flask_cors import CORS
from services import scrape_content, get_industry

from consts import host, port
from data.questions import questions

app = Flask("__main__")
cors = CORS(app)

# Endpoint: Classifies user's input input based on scraped content from the website and generates questions
@app.route('/questions', methods=['GET'])
def classify():
    if not request.data :
    	return jsonify({"error": "no data provided"}), 400

    try:
    	data = request.json
    except Exception as error:
    	return jsonify({"error": str(error)}), 400

    if not data :
    	return jsonify({"error": "no data provided"}), 400

    url = data["url"]

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

if __name__ == "__main__":
	print("Starting server")
	app.run(debug=True, host=host, port=port)
	print("Stoping server")
