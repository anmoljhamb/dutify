import express from "express";
import { protectedRoute, validate } from "../middleware";
import { createEventSchema } from "../schemas";
import { BaseProject, ValidationSchema } from "../types";
import { adminDb } from "../utils";

export const eventRouter = express.Router();

eventRouter.get("/", protectedRoute, async (req, res, next) => {
    try {
        const resp = (await adminDb.collection("events").get()).docs.map(
            (doc) => doc.data()
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }

    return res.status(200).json({ message: "working..." });
});

eventRouter.get("/incomplete", protectedRoute, async (req, res, next) => {
    try {
        const resp = (
            await adminDb.collection("events").where("done", "==", false).get()
        ).docs.map((doc) => doc.data());
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }

    return res.status(200).json({ message: "working..." });
});

eventRouter.get("/complete", protectedRoute, async (req, res, next) => {
    try {
        const resp = (
            await adminDb.collection("events").where("done", "==", true).get()
        ).docs.map((doc) => doc.data());
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }

    return res.status(200).json({ message: "working..." });
});

eventRouter.post(
    "/",
    protectedRoute,
    validate(createEventSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const { name, desc } = req.body as BaseProject;
            const docRef = adminDb.collection("events").doc();
            await docRef.set({ name, desc, uid: docRef.id, done: false });
            return res.status(200).json({ name, desc, uid: docRef.id });
        } catch (e) {
            next(e);
        }
    }
);
