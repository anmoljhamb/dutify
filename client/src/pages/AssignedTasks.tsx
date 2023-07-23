import { useContext, useEffect, useRef, useState } from "react";
import { AssignedList, CreateTask, ImageBg, TasksList } from "../components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { FetchedEvent, FetchedTask } from "../types";
import { AuthContext } from "../contexts";
import { Typography, Divider, Button, CircularProgress } from "@mui/material";
import { useFetchEvents } from "../hooks";

export const AssignedTask = () => {
    const [eventsLoading, setEventsLoading] = useState<boolean>(true);
    const lastLength = useRef(0);
    const authContext = useContext(AuthContext)!;
    const [tasks, setTasks] = useState<FetchedTask[]>([]);

    const events = useFetchEvents({ setLoading: setEventsLoading });

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "tasks"), (docsRef) => {
            const tempTasks: FetchedTask[] = [];
            docsRef.docs.forEach((doc) => {
                const temp = doc.data() as FetchedTask;
                if (
                    lastLength.current !== 0 &&
                    lastLength.current !== docsRef.docs.length
                ) {
                    if (temp.assignedTo === authContext.userDetails?.uid) {
                        alert("New Task Was Just Assigned.");
                    }
                }
                if (temp.assignedTo === authContext.userDetails?.uid)
                    tempTasks.push(temp);
            });
            setTasks(tempTasks);
            lastLength.current = docsRef.docs.length;
        });
        return unsub;
    }, [authContext.userDetails]);

    return (
        <div className="relative ml-[200px] flex h-full w-[calc(100%-200px)] flex-col items-center justify-center bg-bgColor">
            <ImageBg />
            <div className="z-10 flex h-[90%] w-11/12 flex-col rounded-md bg-textColor p-4 text-bgColor">
                <Typography variant="h4" className="text-center">
                    Assigned Tasks
                </Typography>
                <Divider className="my-4" />
                {tasks.length === 0 && (
                    <p className="text-center text-error">No Task Was Found</p>
                )}
                {!eventsLoading && tasks.length > 0 && (
                    <div className="h-full text-bgColor">
                        <AssignedList tasks={tasks} events={events} />
                    </div>
                )}
            </div>
        </div>
    );
};
