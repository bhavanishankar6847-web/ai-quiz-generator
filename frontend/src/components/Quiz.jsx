function Quiz({
  questions,
  answers,
  setAnswers,
  submitted,
}) {
  const handleAnswer = (questionIndex, answer) => {
    // Don't allow changing answers after submission
    if (submitted) {
      return;
    }

    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  return (
    <div className="quiz">
      <h2>Quiz</h2>

      {questions.map((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.answer;

        return (
          <div className="card" key={index}>
            <h3>
              {index + 1}. {question.question}
            </h3>

            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className="option"
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={userAnswer === option}
                  disabled={submitted}
                  onChange={() =>
                    handleAnswer(index, option)
                  }
                />

                {option}
              </label>
            ))}

            {/* Show result only after Submit */}
            {submitted && (
              <div className="answer-feedback">
                {isCorrect ? (
                  <>
                    <h4>✅ Correct!</h4>
                  </>
                ) : (
                  <>
                    <h4>❌ Wrong</h4>

                    <p>
                      <strong>Your answer:</strong>{" "}
                      {userAnswer || "Not answered"}
                    </p>

                    <p>
                      <strong>Correct answer:</strong>{" "}
                      {question.answer}
                    </p>
                  </>
                )}

                <p>
                  <strong>Explanation:</strong>{" "}
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Quiz;
