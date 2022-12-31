import topBlob from "../images/top-blob.png";
import bottomBlob from "../images/bottom-blob.png";
export default function StartScreen(props) {
  return (
    <div className="start-screen">
      <div className="top-blob">
        <img src={topBlob} alt="top-blob" />
      </div>
      <div className="entry-container">
        <h2 className="title">Quizzical</h2>
        <p className="description">Some description if needed</p>
        <button onClick={props.start} className="start-btn">
          Start Quiz
        </button>
      </div>
      <div className="bottom-blob">
        <img src={bottomBlob} alt="bottom-blob" />
      </div>
    </div>
  );
}
