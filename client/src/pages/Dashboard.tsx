import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts";

export const Dashboard = () => {
    const authContext = useContext(AuthContext)!;

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Button variant="contained" onClick={authContext.logOut}>
                Logout
            </Button>
        </div>
    );
};
