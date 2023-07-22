import * as Yup from "yup";

export const userSignUpSchema = Yup.object({
    body: Yup.object({
        name: Yup.string().min(3).max(32).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        role: Yup.string()
            .oneOf([...new Array(7)].map((_, index) => `Level ${index + 1}`))
            .required(),
    }),
});
