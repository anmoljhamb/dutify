import * as Yup from "yup";

export const userSignUpSchema = Yup.object({
    body: Yup.object({
        name: Yup.string().min(3).max(32).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        role: Yup.string().min(1).max(128).required(),
    }),
});
