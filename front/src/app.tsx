import React from "react";
import URLInput from "./components/url-input";
import Questions from "./components/questions";

const App: React.FC = () => {
	return (
		<div className="App">
			<h1>Website Classification</h1>
			<URLInput />
			<Questions />
		</div>
	);
};

export default App;
