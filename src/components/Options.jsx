const Options = ({ question, dispatch, answer }) => {
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
            {hasAnswered && (
                <button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "nextQuestion" })}
                >
                    next question
                </button>
            )}
        </div>
    );
};

export default Options;
