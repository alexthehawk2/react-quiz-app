import "./style.css";
import StartScreen from "./components/StartScreen";
import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
function App() {
  const [quizData, setQuizData] = useState(false);
  const [startStatus, setStartStatus] = useState(true);
  function start() {
    const startElement = document.getElementsByClassName("entry-container")[0];
    startElement.style.display = "none";
    setStartStatus(true);
  }
  useEffect(() => {
    if (startStatus) {
      const apiEndpoint =
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy";
      fetch(apiEndpoint)
        .then((res) => res.json())
        .then((data) => {
          setQuizData(data.results);
        });
    }
  }, [startStatus]);
  return (
    <div className="App">
      {/* <StartScreen start={start} /> */}
      {quizData && <Quiz quizData={quizData} />}
      <button className="start-btn check-btn">Check Answer</button>
    </div>
  );
}

export default App;
