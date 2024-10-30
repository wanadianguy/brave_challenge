import axios from "axios";

const API_URL = "http://localhost:5001";

export const getQuestions = (url: string) => {
	return axios.get(`${API_URL}/questions`, {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		params: {
			url: url,
		},
	});
};

export const saveAnswers = (answers: any) => {
	return axios.post(`${API_URL}/answers`, answers, {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
};
