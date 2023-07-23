import { Button } from "@mui/material";
import * as Constants from "./constants";

const App = () => {
    console.log(Constants);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-bgColor">
            <h1 className="text-4xl uppercase text-white">hello world!</h1>
            <Button>Login???</Button>
        </div>
    );
};

export default App;
