import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = Math.floor(secondsRemaining % 60);
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className="timer">
            {mins}:{secs < 10 && "0"}{secs}
        </div>
    );
};

export default Timer;
