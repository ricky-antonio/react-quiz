import { useQuiz } from "../context/QuizContext";

const Options = ({ question }) => {
    const {dispatch, answer} = useQuiz();
    const hasAnswered = answer !== null;
    
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    key={option}
                    disabled={hasAnswered}
                    className={`btn btn-option ${
                        answer === index ? "answer" : ""
                    } 
                    ${
                        hasAnswered &&
                        (index === question.correctOption ? "correct" : "wrong")
                    }
                    `}
                    onClick={() =>
                        dispatch({
                            type: "newAnswer",
                            payload: index,
                        })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Options;
