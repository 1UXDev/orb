import React, { useState } from "react";
import { questions } from "../../../public/questionsDB";
import styles from "./Questionnaire.module.css";

const Questionnaire = () => {
  // State to store user-selected answers
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  // Handler for when an answer is selected
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the submitted answers (e.g., send them to a server)
    console.log("Submitted Answers:", answers);
  };

  // Render the form with questions as dropdowns
  return (
    <div>
      <form className={`${styles.responsiveForm}`} onSubmit={handleSubmit}>
        {questions.map((questionObj, index) => (
          <div key={index} className="question">
            <p>{questionObj.question}</p>
            <select
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              <option value="">Select an answer</option>
              {questionObj.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className={`${styles.questionnaireButtons}`}>
          <button className={`${styles.ghostButton}`}>Save</button>
          <button type="submit">Submit Answers</button>
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
