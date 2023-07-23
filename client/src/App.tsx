import { useContext } from "react";
import { Navbar } from "./components/shared";
import { AuthContext } from "./contexts";

const App = () => {
    const authContext = useContext(AuthContext)!;

    return (
        <>
            {!authContext.currentUser && <Navbar />}
            Routes.
        </>
    );
};

export default App;
