import React from "react";
import URLInput from "./components/url-input/url-input";
import Questions from "./components/questions/questions";
import "./app.css";

const App: React.FC = () => {
	return (
		<div className="app">
			<h1>Website Classification</h1>
			<URLInput />
			<Questions />
		</div>
	);
};

export default App;
