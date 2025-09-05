import { useState } from "react";
import "./App.css";

// Local questions (replace with API if needed)
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which programming language runs in a web browser?",
    options: ["Python", "C++", "Java", "JavaScript"],
    answer: "JavaScript",
  },
  {
    id: 3,
    question: "Who developed React?",
    options: ["Google", "Facebook", "Microsoft", "Twitter"],
    answer: "Facebook",
  },
  {
    id: 4,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style System",
      "Creative Style Syntax",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    id: 5,
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<p>", "<a>", "<link>", "<h1>"],
    answer: "<a>",
  },
];

function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === null) return;

    const isCorrect = selected === questions[currentQ].answer;
    setAnswers([
      ...answers,
      { ...questions[currentQ], selected, isCorrect },
    ]);

    if (isCorrect) setScore(score + 1);

    setSelected(null);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="app">
      <h1 className="title">React Quiz App</h1>

      <div className="card">
        {!showResults ? (
          <div className="quiz">
            <h2>
              Question {currentQ + 1} of {questions.length}
            </h2>
            <p className="question">{questions[currentQ].question}</p>

            <div className="options">
              {questions[currentQ].options.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${
                    selected === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              className="next-btn"
              onClick={handleNext}
              disabled={selected === null}
            >
              {currentQ + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        ) : (
          <div className="results">
            <h2>
              You scored {score} / {questions.length}
            </h2>

            <ul>
              {answers.map((ans, index) => (
                <li key={index} className="result-item">
                  <p>
                    <strong>Q{index + 1}:</strong> {ans.question}
                  </p>
                  <p>
                    Your Answer:{" "}
                    <span
                      style={{
                        color: ans.isCorrect ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {ans.selected}
                    </span>
                  </p>
                  {!ans.isCorrect && (
                    <p>
                      Correct Answer:{" "}
                      <span style={{ color: "green" }}>{ans.answer}</span>
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <button className="restart-btn" onClick={handleRestart}>
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
