import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.scss";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";
import {
    COLOR_BG,
    COLOR_ERROR,
    COLOR_INFO,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_SUCCESS,
    COLOR_WARNING,
} from "./constants";

const theme = createTheme({
    palette: {
        primary: {
            main: COLOR_PRIMARY,
        },
        secondary: {
            main: COLOR_SECONDARY,
        },
        error: {
            main: COLOR_ERROR,
        },
        warning: {
            main: COLOR_WARNING,
        },
        info: {
            main: COLOR_INFO,
        },
        success: {
            main: COLOR_SUCCESS,
        },
        background: {
            default: COLOR_BG,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
