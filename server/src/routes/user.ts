import express from "express";
import { userSignUpSchema } from "../schemas";
import { ValidationError } from "yup";
import createHttpError from "http-errors";
import { validate } from "../middleware";
import { ValidationSchema } from "../types";

export const userRouter = express.Router();

userRouter.get("/", (_req, res) => {
    return res.status(200).json({ message: "working" });
});

userRouter.post(
    "/signup",
    validate(userSignUpSchema as unknown as ValidationSchema),
    (req, res) => {
        console.log(req.body);
        console.log(req.headers);
        return res.status(200).json({ message: "Working..." });
    }
);
