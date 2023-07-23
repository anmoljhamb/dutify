import express from "express";
import { protectedRoute, validate } from "../middleware";
import {
    createEventSchema,
    fetchEventSchema,
    updateEventSchema,
} from "../schemas";
import { BaseEvent, ValidationSchema } from "../types";
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
            const { name, desc } = req.body as BaseEvent;
            const docRef = adminDb.collection("events").doc();
            await docRef.set({ name, desc, uid: docRef.id, done: false });
            return res
                .status(200)
                .json({ name, desc, uid: docRef.id, done: false });
        } catch (e) {
            next(e);
        }
    }
);

eventRouter.get(
    "/undo",
    protectedRoute,
    validate(fetchEventSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const uid = req.query.uid as string;
            const resp = await adminDb.collection("events").doc(uid).update({
                done: false,
            });
            return res.status(200).json(resp);
        } catch (e) {
            next(e);
        }
    }
);

eventRouter.get(
    "/done",
    protectedRoute,
    validate(fetchEventSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const uid = req.query.uid as string;
            const resp = await adminDb.collection("events").doc(uid).update({
                done: true,
            });
            return res.status(200).json(resp);
        } catch (e) {
            next(e);
        }
    }
);

eventRouter.patch(
    "/",
    protectedRoute,
    validate(fetchEventSchema as unknown as ValidationSchema),
    validate(updateEventSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const uid = req.query.uid as string;
            const { name, desc } = req.body as Partial<BaseEvent>;
            const resp = await adminDb.collection("events").doc(uid).update({
                name,
                desc,
            });
            return res.status(200).json(resp);
        } catch (e) {
            next(e);
        }
    }
);

eventRouter.delete(
    "/",
    protectedRoute,
    validate(fetchEventSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const uid = req.query.uid as string;
            const resp = await adminDb.collection("events").doc(uid).delete();
            // todo delete the tasks with projectId as the given id.
            return res.status(200).json(resp);
        } catch (e) {
            next(e);
        }
    }
);
