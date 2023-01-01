import { nanoid } from "nanoid";

export default function Quiz(props) {
  const questionElements = props.quizData.map((quiz) => {
    
    const allAnswers = quiz.randomAnswerPlacement
    
    return (
      
      <div key={nanoid()} className="question-box">
        <h3 className="question">{quiz.question}</h3>
        <div className="answers">
          {props.startStatus ? (allAnswers.map((answer) => {
            return <button id={quiz.questionId} key={nanoid()} onClick={props.selectAnswer} className={`answer ${quiz.selectedAnswer===answer ?"selected-answer": ""}`}>{answer}</button>;
          })) :
          allAnswers.map(answer=>
          {
            if(quiz.selectedAnswer === answer && quiz.rightAnswerSelected){
            return <button id={quiz.questionId} key={nanoid()} onClick={props.selectAnswer} className="answer right-answer">{answer}</button>;
            }

            if(quiz.selectedAnswer === answer && !quiz.rightAnswerSelected){
            return<button id={quiz.questionId} key={nanoid()} onClick={props.selectAnswer} className="answer wrong-answer">{answer}</button>;
               
            }
            if(quiz.selectedAnswer !== answer && answer===quiz.correct_answer){
            return <button id={quiz.questionId} key={nanoid()} onClick={props.selectAnswer} className="answer right-answer">{answer}</button>;
            }

            if(quiz.selectedAnswer !== answer){
            return <button id={quiz.questionId} key={nanoid()} onClick={props.selectAnswer} className="answer unselected-answer">{answer}</button>;

            }
          })}
        </div>
      </div>
    );
  });
  
  return <div className="quiz-container">{questionElements}
  </div>;
}
