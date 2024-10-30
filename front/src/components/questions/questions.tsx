import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./questions.css";
import { saveAnswers } from "../../services/service";

const Questions: React.FC = () => {
	const { industry, questions, loading, error } = useSelector(
		(state: RootState) => state.classify,
	);

	var answers: { question: string; answer: string }[] = [];

	const [isSubmitted, setIsSubmitted] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!industry) return null;

	const handleSubmit = () => {
		saveAnswers(answers)
			.then(() => setIsSubmitted(true))
			.catch((error) => console.log(error));
	};

	return (
		<div className="questions">
			{!isSubmitted ? (
				<>
					<h2 className="industry">Website's industry: {industry}</h2>
					<h3>Questions related to that field:</h3>
					<form>
						{questions.map((question, index) => {
							answers.push({
								question: question.question,
								answer: "",
							});
							return (
								<div key={index}>
									<h4>{question.question}</h4>
									{question.options.map((option, i) => (
										<label key={i}>
											<input
												type="radio"
												name={`answer-${index}`}
												onClick={() => {
													answers[index] = {
														question:
															question.question,
														answer: option,
													};
													console.log(answers);
												}}
											/>
											{option}
										</label>
									))}
								</div>
							);
						})}
						<button
							className="questions-button"
							onClick={handleSubmit}
							type="submit"
						>
							Submit
						</button>
					</form>
				</>
			) : (
				<h2 className="thanks">Thank you for answering</h2>
			)}
		</div>
	);
};

export default Questions;
