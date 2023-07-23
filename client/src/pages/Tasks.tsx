import { useState } from "react";
import { ImageBg } from "../components";

export const Tasks = () => {
    const [tasksLoading, setTasksLoading] = useState<boolean>(true);
    const [tasksFetch, setTasksFetchh] = useState<boolean>(false);
    const [addTask, setAddTask] = useState<boolean>(false);

    // const tasks =

    return (
        <div className="relative flex h-full flex-col items-center justify-center bg-bgColor">
            <ImageBg />
            {/* <h1> {events.length}</h1> */}
            <h1 className="z-10">hello???</h1>
        </div>
    );
};
