function ListOptionsAnswers({
  options,
  selectedAnswer,
  onSelectAnswer,
  answered,
  correctAnswerId,
  visible = false,
}) {
  return (
    <div className={`options-container ${visible ? "visible" : "collapsed"}`}>
      <h3>Escolha uma opção:</h3>
      <ul className="options-list">
        {options.map((option) => (
          <li key={option.id}>
            <button
              className={`option-btn ${
                selectedAnswer === option.id ? "selected" : ""
              } ${answered && option.id === correctAnswerId ? "correct" : ""} ${
                answered &&
                selectedAnswer === option.id &&
                option.id !== correctAnswerId
                  ? "incorrect"
                  : ""
              }`}
              onClick={() => onSelectAnswer(option.id)}
              disabled={answered || !visible}
            >
              <div className="option-content">
                <div className="option-name">{option.name}</div>
                <div className="option-ref">Ref: {option.reference}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOptionsAnswers;
