import express from "express";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    return res.status(200).json({ message: "working" });
});
