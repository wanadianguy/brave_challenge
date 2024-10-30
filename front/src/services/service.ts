import axios from "axios";

const API_URL = "http://localhost:5001/questions";

export const getQuestions = (url: string) => {
	return axios.get(API_URL, {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		params: {
			url: url,
		},
	});
};
