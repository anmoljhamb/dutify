import express from "express";
import { protectedRoute, validate } from "../middleware";
import { createTaskSchema } from "../schemas";
import { BaseTask, User, ValidationSchema } from "../types";
import { adminDb } from "../utils";

export const taskRouter = express.Router();

taskRouter.get("/", async (req, res, next) => {
    return res.status(200).json({ message: "working..." });
});

taskRouter.post(
    "/",
    protectedRoute,
    validate(createTaskSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const { name, desc, projectId, assignedTo } = req.body as BaseTask;
            const docRef = adminDb.collection("tasks").doc();
            const currentUser = res.locals.user as User;
            await docRef.set({
                name,
                desc,
                projectId,
                assignedTo,
                userId: currentUser.uid,
                done: false,
            });
            return res.status(200).json({
                name,
                desc,
                projectId,
                assignedTo,
                userId: currentUser.uid,
                done: false,
            });
        } catch (e) {
            next(e);
        }
    }
);
