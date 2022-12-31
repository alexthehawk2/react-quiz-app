export default function Quiz(props) {
  const questionElements = props.quizData.map((quiz) => {
    const allAnswers = quiz.incorrect_answers.concat(quiz.correct_answer);
    return (
      <div className="question-box">
        <h3 className="question">{quiz.question}</h3>
        <div className="answers">
          {allAnswers.map((answer) => {
            return <button className="answer">{answer}</button>;
          })}
        </div>
      </div>
    );
  });
  return <div className="quiz-container">{questionElements}</div>;
}
