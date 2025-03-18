import Options from "./Options";

const Question = ({ question, dispatch, answer, points }) => {
    return (
        <div className="question">
            <h4>points: {points}</h4>
            <h4>{question.question}</h4>

            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
};

export default Question;
