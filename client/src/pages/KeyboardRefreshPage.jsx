import React, { useState, useEffect } from "react";
import { saveResult } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function KeyboardRefreshPage() {
    const [started, setStarted] = useState(false);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!started) return;

        const handleKey = (e) => {
            if (e.ctrlKey && e.key === "r") {
                e.preventDefault();
                setCount(prev => prev + 1);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [started]);

    useEffect(() => {
        if (count === 5 && started && !finished) handleFinish();
    }, [count]);

    const handleStart = () => {
        setStarted(true);
        setStartTime(Date.now());
    };

    const handleFinish = async () => {
        const totalTime = Date.now() - startTime;
        const avgTime = totalTime / 5;

        await saveResult({
            participantId: parseInt(localStorage.getItem("participantId")),
            task: "keyboard_refresh",
            totalTime,
            avgTime,
        });

        setFinished(true);
        navigate("/8");
    };

    return (
        <div>
            <h2>Keyboard Refresh Task</h2>
            {!started && (
                <>
                    <p>Press Ctrl+R five times.</p>
                    <button onClick={handleStart}>Start</button>
                </>
            )}
            {started && !finished && <p>Completed: {count}/5</p>}
        </div>
    );
}