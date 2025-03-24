import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

const Question = () => {
    const { question, dispatch, answer } = useQuiz();

    return (
        <div className="question">
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
};

export default Question;
