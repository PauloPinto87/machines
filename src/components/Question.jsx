import { useState, useEffect, useRef } from "react";
import ImageQuestion from "./ImageQuestion.jsx";
import ListOptionsAnswers from "./ListOptionsAnswers.jsx";
import { generateQuestion } from "../utils/quizUtils";

function Question({ machines, onAnswer }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const initializedRef = useRef(false);

  const generateNewQuestion = () => {
    const newQuestion = generateQuestion(machines);
    setQuestion(newQuestion);
    setSelectedAnswer(null);
    setAnswered(false);
    setFeedback("");
  };

  useEffect(() => {
    if (!initializedRef.current && machines && machines.length > 0) {
      initializedRef.current = true;
      generateNewQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machines]);

  const handleSelectAnswer = (machineId) => {
    if (!answered) {
      setSelectedAnswer(machineId);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correctAnswerId;
    setAnswered(true);

    if (isCorrect) {
      setFeedback("✅ Correto! Parabéns!");
    } else {
      const correctName = question.correctMachine.name;
      const correctRef = question.correctMachine.reference;
      setFeedback(
        `❌ Errado! A resposta correta é: ${correctName} (${correctRef})`
      );
    }

    onAnswer(isCorrect);
  };

  const handleNextQuestion = () => {
    generateNewQuestion();
  };

  if (!question) return <div>Carregando...</div>;

  return (
    <div className="question-container">
      <div className="question-info">
        <h2>Qual é esta máquina?</h2>
      </div>

      <ImageQuestion imageUrl={question.correctMachine.imageUrl} />

      <ListOptionsAnswers
        options={question.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        answered={answered}
        correctAnswerId={question.correctAnswerId}
      />

      {answered && (
        <div className="feedback-section">
          <p
            className={`feedback ${
              question.correctAnswerId === selectedAnswer ? "success" : "error"
            }`}
          >
            {feedback}
          </p>
        </div>
      )}

      {!answered ? (
        <button
          className="submit-btn"
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null}
        >
          Responder
        </button>
      ) : (
        <button className="next-btn" onClick={handleNextQuestion}>
          Próxima Pergunta
        </button>
      )}
    </div>
  );
}

export default Question;
