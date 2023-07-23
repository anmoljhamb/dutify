import { useContext } from "react";
import { Navbar } from "./components/shared";
import { AuthContext } from "./contexts";
import { Navigate, Route, Routes } from "react-router-dom";
import { ConditionalRoute } from "./components";
import { Dashboard, ForgetPassword, Login, SignUp } from "./pages";

const App = () => {
    const authContext = useContext(AuthContext)!;

    return (
        <>
            {!authContext.currentUser && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <ConditionalRoute
                            loggedInElement={<Dashboard />}
                            unProtectedElement={<Navigate to={"/login"} />}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ConditionalRoute
                            unProtectedElement={<Login />}
                            loggedInElement={<Navigate to={"/"} />}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <ConditionalRoute
                            unProtectedElement={<SignUp />}
                            loggedInElement={<Navigate to={"/"} />}
                        />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ConditionalRoute
                            unProtectedElement={<ForgetPassword />}
                            loggedInElement={<Navigate to={"/"} />}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default App;
