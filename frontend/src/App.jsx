import { useState } from "react";

import TopicInput from "./components/TopicInput";
import Difficulty from "./components/Difficulty";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic,
            difficulty: difficulty,
            number_of_questions: 50,
          }),
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate quiz");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setQuestions(data.questions);
      setAnswers({});
      setScore(null);
    } catch (error) {
      console.error("Quiz generation error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>🤖 AI Quiz Generator</h1>

      <TopicInput
        topic={topic}
        setTopic={setTopic}
      />

      <Difficulty
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <button
        onClick={generateQuiz}
        disabled={loading}
      >
        {loading ? "Generating Quiz..." : "Generate Quiz"}
      </button>

      {questions.length > 0 && (
        <>
          <Quiz
            
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          submitted={submitted}

          />

          <button onClick={submitQuiz}>
            Submit Quiz
          </button>
        </>
      )}

      {score !== null && (
        <Result
          score={score}
          total={questions.length}
        />
      )}
    </div>
  );
}

export default App;
