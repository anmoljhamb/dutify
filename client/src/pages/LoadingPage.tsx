import { COLOR_BG } from "../constants";
import Loader from "react-spinners/GridLoader";

export const LoadingPage = () => {
    return (
        <div className="flex h-full w-screen flex-col items-center justify-center bg-bgColor">
            <Loader size={45} color={COLOR_BG} />
        </div>
    );
};
