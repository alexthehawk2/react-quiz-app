import "./style.css";
import StartScreen from "./components/StartScreen";
import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { BarLoader } from "react-spinners";
import MoonLoader from "react-spinners/MoonLoader";
import HashLoader from "react-spinners/HashLoader";
function App() {
  const [quizData, setQuizData] = useState(false);
  const [startStatus, setStartStatus] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false)
  const [startAgain, setStartAgain] = useState(false)
  const apiEndpoint =
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy";
  function start() {
    const startElement = document.getElementsByClassName("entry-container")[0];
    startElement.style.display = "none";
    setStartStatus(true);
    setStartAgain(true)
    setLoading(true)
  }
  function allValuesTrue(array) {
    return array.every(val => val === true);
  }
  function checkAnswers() {
    
    
    const allAnswersSelected = quizData.map(question=> question.selectedAnswer ? true : false)
    if(allValuesTrue(allAnswersSelected)){
      setQuizEnd(true)
      setStartStatus(false)
      setQuizData(oldQuizData => oldQuizData.map(question=>{
        if(question.correct_answer === question.selectedAnswer){
          setCorrectCount(oldCorrectCount => oldCorrectCount + 1)
          return {...question, rightAnswerSelected:true}
        }else {
          return question
        }
      }))
    }else {
      

    }
  }
  function selectAnswer(event){
    const clickedButtonElement  = event.target
    const questionId = event.target.id
    const selectedAnswerValue = event.target.innerHTML
    if(clickedButtonElement.classList[1]){

      setQuizData(oldQuizData=> oldQuizData.map(question =>{
        return question.questionId === questionId ? {...question, selectedAnswer: false} :
         question
       }))
    }else{
      setQuizData(oldQuizData=> oldQuizData.map(question =>{
       return question.questionId === questionId ? {...question, selectedAnswer: selectedAnswerValue} :
        question
      }))
    }
  }

  function playAgain(){

    setCorrectCount(0)
    setQuizEnd(false)
    setQuizData(false)
    setStartStatus(true)
    setStartAgain(startAgain => !startAgain)
    
  }
  function decodeAllArrayItems(arr){
    const newArr = []
    arr.forEach(item=> newArr.push(decode(item)))
    return newArr
  }
  useEffect(() => {
     if(!startStatus){

     }else{
      fetch(apiEndpoint)
        .then((res) => res.json())
        .then((data) => {
          setQuizData(data.results.map(question=> {
            const randomAnswerPlacement = question.incorrect_answers.concat(question.correct_answer)
            randomAnswerPlacement.splice(Math.floor(Math.random() * randomAnswerPlacement.length), 0, randomAnswerPlacement.pop());

            return (
              {...question, selectedAnswer : false , questionId : nanoid(), rightAnswerSelected : false, randomAnswerPlacement: decodeAllArrayItems(randomAnswerPlacement), question: decode(question.question), incorrect_answers: decodeAllArrayItems(question.incorrect_answers),correct_answer: decode(question.correct_answer)}
            )
          }));
        });
     }
      
    
  }, [startStatus,startAgain]);
  const [loading, setLoading] = useState(true)

  useEffect (()=>{
    setLoading(false)
  }, [quizData])
  return (
    <div className="App">
    <StartScreen start={start} />
    {loading ? <HashLoader size={100} loading={loading} style={{"display": "block"}}/> : quizData && <Quiz selectAnswer={selectAnswer} startStatus={startStatus} quizData={quizData} />}
      {!loading && startStatus ? <button onClick={checkAnswers} className="start-btn check-btn">Check Answer</button> : ""}
      {quizEnd && <div className="score-container">
        <p className="description">{`You scored ${correctCount}/5 correct answer.`}</p>
        <button onClick={playAgain} className="start-btn check-btn">Play Again</button>
      </div>}

    </div>
  );
}

export default App;
