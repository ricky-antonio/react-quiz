import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

const Question = () => {
    const { question } = useQuiz();

    return (
        <div className="question">
            <h4>{question.question}</h4>
            <Options question={question} />
        </div>
    );
};

export default Question;
