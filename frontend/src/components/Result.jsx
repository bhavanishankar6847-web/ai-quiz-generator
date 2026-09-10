function Result({ score, total }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="result">

      <h2>Quiz Completed!</h2>

      <h3>
        Your Score: {score} / {total}
      </h3>

      <p>
        Percentage: {percentage}%
      </p>

    </div>
  );
}

export default Result;
