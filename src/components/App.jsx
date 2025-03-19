import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

const initialState = {
    questions: [],
    //"loading", "error", "ready", "active", "finished"
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "startQuiz":
            return { ...state, status: "active" };
        case "newAnswer": {
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        }
        case "nextQuestion":
            return {
                ...state,
                answer: null,
                index: state.index++,
            };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        default:
            throw new Error("Unknown action");
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { questions, status, index, answer, points, highscore } = state;
    const numQuestions = questions.length;
    const maxPoints = questions.reduce(
        (acc, question) => question.points + acc,
        0
    );

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => {
                console.error("Error", err);
                dispatch({ type: "dataFailed" });
            });
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            points={points}
                            numQuestions={numQuestions}
                            maxPoints={maxPoints}
                            answer={answer}
                        />

                        <Question
                            question={questions[index]}
                            answer={answer}
                            dispatch={dispatch}
                            points={state.points}
                        />

                        <NextButton
                            dispatch={dispatch}
                            answer={answer}
                            numQuestions={numQuestions}
                            index={index}
                        />
                    </>
                )}

                {status === "finished" && (
                    <FinishedScreen points={points} maxPoints={maxPoints} highscore={highscore} />
                )}
            </Main>
        </div>
    );
};

export default App;
