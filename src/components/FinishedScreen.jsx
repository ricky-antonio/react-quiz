import { useQuiz } from "../context/QuizContext";

const FinishedScreen = () => {
    const { points, maxPoints, highscore, dispatch } = useQuiz();
    const percentage = Math.ceil((points / maxPoints) * 100);
    
    return (
        <>
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
        </p>

        <p className="highscore">(Highscore: {highscore} points)</p>

        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "restart" })}
        >
            Retry Quiz
        </button>
        </>
    );
};

export default FinishedScreen;
