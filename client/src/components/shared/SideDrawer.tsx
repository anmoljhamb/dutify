import { Inbox, Logout, Mail } from "@mui/icons-material";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext, MessageContext } from "../../contexts";

export const SideDrawer = () => {
    const authContext = useContext(AuthContext)!;
    const { showMessage } = useContext(MessageContext)!;

    return (
        <Drawer
            sx={{
                width: 200,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 200,
                    boxSizing: "border-box",
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem>
                    <Typography
                        variant="h6"
                        component="div"
                        className="flex-grow text-center text-2xl"
                    >
                        VENT-SIGN
                    </Typography>
                </ListItem>
                <Divider />
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Logout"}
                            onClick={() => {
                                showMessage(
                                    "User Logged out successfully!",
                                    "info"
                                );
                                authContext.logOut();
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};
