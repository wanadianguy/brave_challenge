import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { classifyURL } from "../../redux/slice";
import "./url-input.css";

const URLInput: React.FC = () => {
	const [url, setUrl] = useState("");
	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (url) {
			dispatch(classifyURL(url));
		}
	};

	return (
		<form onSubmit={handleSubmit} className="form">
			<input
				className="input"
				type="text"
				placeholder="Enter website URL"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				required
			/>
			<button className="url-button" onClick={handleSubmit} type="submit">
				Classify
			</button>
		</form>
	);
};

export default URLInput;
