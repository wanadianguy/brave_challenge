import axios from "axios";

const API_URL = "http://localhost:5100/classify";

const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
};

const classify = (url: string) => {
	return axios.post(API_URL, { url }, config);
};

export default {
	classify,
};
