import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("workng...");
    return res.status(200).json({ message: "working..." });
});

app.listen(8080, () => {
    console.log(`Listening on the url ${8080}`);
});
