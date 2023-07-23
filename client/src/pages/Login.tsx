import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, MessageContext } from "../contexts";
import { FirebaseError } from "firebase/app";
import { ImageBg, Form } from "../components";
import { Typography, Divider, Button } from "@mui/material";
import { loginSchema } from "../validators";

export const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext)!;
    const { showMessage } = useContext(MessageContext)!;
    const navigator = useNavigate();

    const onSubmit = async (values: Record<string, string>) => {
        setLoading(true);
        try {
            await authContext.logIn(values.email, values.password);
            showMessage(
                "Logged In Successfully! Redirecting in a couple of seconds.",
                "success"
            );
            // * The reason we don't need a setTimeout and a navigator after login, is because our app router, gets rerendered after a user is logged in, and, when the app Router is logged in, it sees that the /login link should only be accessed when the user is logged out, and the user is redirected to the / immediately.
        } catch (err) {
            if (err instanceof FirebaseError) {
                if (err.code === "auth/user-not-found") {
                    showMessage("User Not Found", "error");
                }
                if (err.code === "auth/wrong-password") {
                    showMessage("Wrong Password", "error");
                }
                if (err.code === "auth/too-many-requests") {
                    showMessage(
                        "Too Many Request. Please try again later.",
                        "error"
                    );
                }
                console.trace(err.code);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-full w-screen flex-col items-center justify-around">
            <ImageBg />
            <div className="container z-10 h-auto w-96 rounded-md bg-textColor p-4 text-black">
                <Typography variant="h4" className="text-center text-bgColor">
                    Login
                </Typography>
                <Divider className="m-4" />
                <Form
                    buttonText="Login"
                    loading={loading}
                    onSubmit={onSubmit}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    formFields={[
                        {
                            label: "Enter your Email",
                            name: "email",
                            type: "text",
                        },
                        {
                            label: "Enter your password",
                            name: "password",
                            type: "password",
                        },
                    ]}
                />
                <Button onClick={() => navigator("/forgot-password")}>
                    Forgot Password?
                </Button>
                <div className="flex items-center justify-center gap-2 text-bgColor">
                    Don't have an account already?{" "}
                    <Button onClick={() => navigator("/signup")}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
};
