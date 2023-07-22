import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 404 not found.
app.use((req, _res, next) => {
    const err = new createError.NotFound(
        `The requested url ${req.url} was not found.`
    );
    return next(err);
});

// Error Handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ err });
});

app.listen(PORT, () => {
    console.log(`Listening on the url *:${PORT}`);
});
