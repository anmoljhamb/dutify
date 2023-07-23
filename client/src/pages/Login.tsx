import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, MessageContext } from "../contexts";
import { FirebaseError } from "firebase/app";

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

    return <h1>login</h1>;
};
