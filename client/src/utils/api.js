export const saveResult = async (data) => {
    await fetch("https://shortcut-experiment.onrender.com/api/results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};