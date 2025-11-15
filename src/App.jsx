import { useState } from "react";
import "./App.css";
import Question from "./components/Question";
import { machines } from "./data/machines";

function App() {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleAnswer = (isCorrect) => {
    setTotalQuestions(totalQuestions + 1);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleReset = () => {
    setScore(0);
    setTotalQuestions(0);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔧 Quiz de Máquinas Makita</h1>
        <div className="score-board">
          <span>
            Acertos: {score} / {totalQuestions}
          </span>
          {totalQuestions > 0 && (
            <span className="percentage">
              ({Math.round((score / totalQuestions) * 100)}%)
            </span>
          )}
        </div>
      </header>
      <main>
        <Question machines={machines} onAnswer={handleAnswer} />
        {totalQuestions > 0 && (
          <button className="reset-btn" onClick={handleReset}>
            Reiniciar Quiz
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
