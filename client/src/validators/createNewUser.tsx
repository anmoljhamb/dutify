import * as Yup from "yup";

export const createNewUserSchema = Yup.object({
    displayName: Yup.string()
        .min(2, "The name needs to be atleast 2 characters long")
        .max(32, "The name can be atmost 32 characters long")
        .required("The display name is a required field"),
    email: Yup.string()
        .email("Please enter a valid email")
        .required("The email is a required field"),
    password: Yup.string()
        .min(6, "Password needs to be atleast 6 characters long")
        .required("Password is a required field"),
    role: Yup.string()
        .oneOf(
            ["admin", "guest", "ae", "je", "xen", "operator", "hod"],
            "The role needs to be one of the following: admin, guest, hod, ae, je, xen, operator"
        )
        .required(),
});
