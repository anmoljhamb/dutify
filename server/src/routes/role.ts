import express from "express";
import { db } from "../utils";

export const roleRouter = express.Router();

roleRouter.get("/", async (req, res, next) => {
    try {
        const resp = (await db.collection("roles").get()).docs.map((doc) => {
            return { ...doc.data(), uid: doc.id };
        });
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
});
