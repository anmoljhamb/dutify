import express, { Request, Response, NextFunction } from "express";
import { protectedRoute, validate } from "../middleware";
import { fetchUserSchema, loginUserSchema, userSignUpSchema } from "../schemas";
import { BaseUser, User, ValidationSchema } from "../types";
import createHttpError from "http-errors";
import { adminAuth, adminDb, clientAuth, getRole, getUser } from "../utils";
import { signInWithEmailAndPassword } from "firebase/auth";

export const userRouter = express.Router();

userRouter.get("/", protectedRoute, async (_req, res, next) => {
    try {
        const currentUser = res.locals.user as User;

        let users = (await adminDb.collection("users").get()).docs.map(
            (doc) => {
                return {
                    ...doc.data(),
                    uid: doc.id,
                    role: getRole(doc.data().role),
                } as User;
            }
        );

        users = users.filter((user) => {
            return user.role.accessLevel <= currentUser.role.accessLevel;
        });

        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
});

userRouter.post(
    "/login",
    validate(loginUserSchema as unknown as ValidationSchema),
    async (req, res, next) => {
        try {
            const user = req.body as { email: string; password: string };
            const userCredentials = await signInWithEmailAndPassword(
                clientAuth,
                user.email,
                user.password
            );
            const currentUser = clientAuth.currentUser!;
            const userDetails = (
                await adminDb.collection("users").doc(currentUser.uid).get()
            ).data() as BaseUser;
            return res.status(200).json({
                ...userDetails,
                role: getRole(userDetails.role),
                accessToken: await currentUser.getIdToken(),
            });
        } catch (e) {
            next(e);
        }
    }
);

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

userRouter.get(
    "/fetchUser",
    validate(fetchUserSchema as unknown as ValidationSchema),
    protectedRoute,
    async (req, res, next) => {
        try {
            const currentUser = res.locals.user as User;
            const user = await getUser(req.query.uid as string);
            if (currentUser.role.accessLevel >= user.role.accessLevel)
                return res.status(200).json({ ...user });
            return next(
                new createHttpError.Unauthorized(
                    "You're not authorized to view the given user's details."
                )
            );
        } catch (e) {
            return next(e);
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
            if (err.code === "auth/user-not-found") {
                return next(createHttpError.BadRequest(err.message));
            }
            return next(createHttpError.BadRequest(err.message));
        }
        return next(createHttpError.BadRequest());
    }
);
