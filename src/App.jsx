import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";

const initialState = {
    questions: [],
    //"loading", "error", "ready", "active", "finished"
    status: "loading",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        default:
            throw new Error("Unknown action");
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { questions, status } = state;

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
                {status === "ready" && (
                    <>
                        {questions.map((item, index) => (
                            <p key={item.id}>{`q-${index + 1}: ${
                                item.question
                            }`}</p>
                        ))}
                    </>
                )}

                {status === "error" && <Error />}
            </Main>
        </div>
    );
};

export default App;
