import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { TaskComment } from ".";
import { BACKEND_URI } from "../../constants";
import { AuthContext, MessageContext } from "../../contexts";
import { FetchedTask } from "../../types";

interface PropsInterface {
    deleteTask: boolean;
    handleClose(): void;
    task?: FetchedTask;
    loading: boolean;
    setLoading(arg0: boolean): void;
}

export const TaskComments = ({
    deleteTask,
    handleClose,
    task,
    loading,
    setLoading,
}: PropsInterface) => {
    const { showMessage } = useContext(MessageContext)!;
    const authContext = useContext(AuthContext)!;

    const deleteAccount = () => {
        setLoading(true);
        axios
            .delete(`${BACKEND_URI}/task?uid=${task?.uid}`, {
                headers: authContext.headers,
            })
            .then(() => {
                showMessage("Task Deleted Successfully!", "success");
            })
            .catch((err) => {
                console.trace(err);
                showMessage(
                    "There was an error while deleting the given task. Please try again.",
                    "error"
                );
            })
            .finally(() => {
                setLoading(false);
                handleClose();
            });
    };

    return (
        <Dialog
            open={deleteTask}
            fullWidth
            onClose={
                loading
                    ? () => {
                          showMessage(
                              "Can't close the dialog box right now.",
                              "warning"
                          );
                      }
                    : handleClose
            }
        >
            <DialogTitle>View Comments</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {/* Are you sure you want to delete the task {task?.name} */}
                    <div className="w-full">
                        <Typography
                            className="w-full text-center text-xl font-semibold uppercase tracking-widest"
                            variant="h4"
                        >
                            Comments
                        </Typography>
                        <List
                            sx={{
                                width: "100%",
                            }}
                            className="flex h-96 flex-col items-center overflow-auto"
                        >
                            <TaskComment
                                name="Person 1"
                                time="12312"
                                comment="adasdasbasdasas"
                            />
                            <TaskComment
                                name="Person 1"
                                time="12312"
                                comment="adasdasbasdasas"
                            />
                            <TaskComment
                                name="Person 1"
                                time="12312"
                                comment="adasdasbasdasas"
                            />
                        </List>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    disabled={loading}
                    color="warning"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
