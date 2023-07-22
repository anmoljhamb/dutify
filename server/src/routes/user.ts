import express from "express";
import { userSignUpSchema } from "../schemas";
import { ValidationError } from "yup";
import createHttpError from "http-errors";

export const userRouter = express.Router();

userRouter.get("/", (_req, res) => {
    return res.status(200).json({ message: "working" });
});

userRouter.post(
    "/signup",
    async (req, _res, next) => {
        try {
            await userSignUpSchema.validate({
                body: req.body,
            });
            next();
        } catch (e) {
            if (e instanceof ValidationError) {
                return next(new createHttpError.BadRequest(e.message));
            }
            return next(e);
        }
    },
    (req, res) => {
        console.log(req.body);
        console.log(req.headers);
        return res.status(200).json({ message: "Working..." });
    }
);
