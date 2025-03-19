const FinishedScreen = ({ points, maxPoints, highscore }) => {
    const percentage = Math.ceil((points / maxPoints) * 100);
    return (
        <>
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
        </p>

        <p className="highscore">(Highscore: {highscore} points)</p>
        </>
    );
};

export default FinishedScreen;
