import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { classifyURL } from "../redux/slice";

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
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter website URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					required
				/>
				<button onClick={handleSubmit} type="submit">
					Classify
				</button>
			</form>
		</div>
	);
};

export default URLInput;
