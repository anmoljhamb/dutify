import express, { Request, Response, NextFunction } from "express";
import { validate } from "../middleware";
import { userSignUpSchema } from "../schemas";
import { BaseUser, ValidationSchema } from "../types";
import createHttpError from "http-errors";
import { adminAuth, adminDb, getRole } from "../utils";

export const userRouter = express.Router();

userRouter.get("/", async (_req, res, next) => {
    const users = (await adminDb.collection("users").get()).docs.map((doc) => {
        return { ...doc.data(), uid: doc.id, role: getRole(doc.data().role) };
    });
    return res.status(200).json(users);
});

userRouter.post(
    "/signup",
    validate(userSignUpSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const user = req.body as BaseUser;
            getRole(user.role);

            const currentUser = await adminAuth.createUser({
                email: user.email,
                password: user.password,
            });

            await adminDb.collection("users").doc(currentUser.uid).set({
                name: user.name,
                email: user.email,
                role: user.role,
                uid: currentUser.uid,
            });
            return res.status(200).json({
                message: "User created successfully!",
                user: currentUser,
            });
        } catch (e) {
            next(e);
        }
    }
);

userRouter.use(
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
        if (createHttpError.isHttpError(err)) {
            return next(err);
        }
        if ("code" in err && "message" in err) {
            if (err.code === "auth/user-not-found") {
                return next(createHttpError.NotFound(err.message));
            }
            return next(createHttpError.BadRequest(err.message));
        }
        return next(createHttpError.BadRequest());
    }
);
