import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Questions: React.FC = () => {
	const { industry, questions, loading, error } = useSelector(
		(state: RootState) => state.classify,
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!industry) return null;

	return (
		<div>
			<h2>Industry: {industry}</h2>
			<h3>Questions:</h3>
			{questions.map((q, index) => (
				<div key={index}>
					<p>{q.question}</p>
					{q.options.map((option, i) => (
						<label key={i}>
							<input type="radio" name={`question-${index}`} />
							{option}
						</label>
					))}
				</div>
			))}
		</div>
	);
};

export default Questions;
