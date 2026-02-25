import React, { useState, useEffect } from "react";
import { saveResult } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function MouseRefreshPage() {
    const [started, setStarted] = useState(false);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (count === 5 && started && !finished) handleFinish();
    }, [count]);

    const handleStart = () => {
        setStarted(true);
        setStartTime(Date.now());
    };

    const handleClick = () => {
        setCount(prev => prev + 1);
    };

    const handleFinish = async () => {
        const totalTime = Date.now() - startTime;
        const avgTime = totalTime / 5;

        await saveResult({
            participantId: parseInt(localStorage.getItem("participantId")),
            task: "mouse_refresh",
            totalTime,
            avgTime,
        });

        setFinished(true);
        navigate("/results");
    };

    return (
        <div>
            <h2>Mouse Refresh Task</h2>
            {!started && (
                <>
                    <p>Click Refresh button five times.</p>
                    <button onClick={handleStart}>Start</button>
                </>
            )}
            {started && !finished && (
                <>
                    <p>Completed: {count}/5</p>
                    <button onClick={handleClick}>Refresh</button>
                </>
            )}
        </div>
    );
}