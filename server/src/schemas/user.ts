import * as Yup from "yup";

export const userSignUpSchema = Yup.object({
    body: Yup.object({
        email: Yup.string().email("Enter a valid email").required(),
        password: Yup.string()
            .min(6, "The password needs to be atleast 6 letters long.")
            .required(),
        role: Yup.string()
            .oneOf(
                [...new Array(7)].map((_, index) => `Level ${index + 1}`),
                `The user needs to be one of the following: ${[...new Array(7)]
                    .map((_, index) => `Level ${index + 1}`)
                    .join()}`
            )
            .required(),
    }),
});
