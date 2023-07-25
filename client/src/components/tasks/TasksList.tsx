/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delete, Edit } from "@mui/icons-material";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridTreeNodeWithRender,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import { FetchedEvent, FetchedTask, UserDetails } from "../../types";
// import { DeleteSite, EditSite } from ".";
import { getElementByUid } from "../../utils";
import { DeleteTask, EditTask } from ".";
import { Typography } from "@mui/material";

export const TasksList = ({
    tasks,
    loading,
    setLoading,
    users,
    events,
    complete,
}: {
    tasks: FetchedTask[];
    events: FetchedEvent[];
    loading: boolean;
    setLoading: (arg0: boolean) => void;
    users: UserDetails[];
    complete?: boolean;
}) => {
    const [editTask, setEditTask] = useState<boolean>(false);
    const [deleteTask, setDeleteTask] = useState<boolean>(false);
    const [, setEditKey] = useState<string>("");
    const [deleteKey, setDeleteKey] = useState<string>("");
    const [task, setTask] = useState<FetchedTask | null>(null);

    const getDetailsFromParams = (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => {
        return tasks.filter((task) => task.uid === params.row.id).at(0);
    };

    const valueGetter = (key: string) => {
        return (params: GridValueGetterParams) => {
            const temp = getDetailsFromParams(params);
            if (key === "done") {
                return temp?.done ? "Complete" : "Incomplete";
            }
            return temp?.[key as keyof FetchedTask] || "NA";
        };
    };

    const eventNameGetter = (key: string) => {
        return (parmas: GridValueGetterParams) => {
            const temp = getDetailsFromParams(parmas);
            const uid = temp?.[key as keyof FetchedTask];
            if (!uid) return "NA";
            const event = getElementByUid(events, uid as string);
            return event?.name || "NA";
        };
    };

    const userEmailValueGetter = (key: string) => {
        return (parmas: GridValueGetterParams) => {
            const temp = getDetailsFromParams(parmas);
            const uid = temp?.[key as keyof FetchedTask];
            if (!uid) return "NA";
            const user = getElementByUid(users, uid as string);
            return user?.email || "NA";
        };
    };

    const handleDelete = (key: string) => {
        return () => {
            setDeleteKey(key);
            setDeleteTask(true);
        };
    };

    const handleEdit = (key: string) => {
        return () => {
            setEditKey(key);
            setEditTask(true);
            const tempTask = tasks.filter((task) => task.uid === key).at(0)!;
            setTask(tempTask);
        };
    };

    const columns: GridColDef[] = [
        {
            field: "action",
            headerName: "Actions",
            type: "actions",
            sortable: false,
            width: 100,
            align: "left",
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        onClick={handleEdit(id as string)}
                        className="text-bgColor"
                    />,
                    <GridActionsCellItem
                        icon={<Delete />}
                        label="Delete"
                        onClick={handleDelete(id as string)}
                        className="text-bgColor"
                    />,
                ];
            },
        },
        {
            field: "name",
            headerName: "Name",
            valueGetter: valueGetter("name"),
            flex: 2,
            align: "left",
        },
        {
            field: "desc",
            headerName: "Description",
            valueGetter: valueGetter("desc"),
            flex: 4,
            align: "left",
        },
        {
            field: "status",
            headerName: "Status",
            valueGetter: valueGetter("done"),
            flex: 2,
            align: "left",
        },
        {
            field: "projectId",
            headerName: "Event",
            valueGetter: eventNameGetter("projectId"),
            flex: 2,
            align: "left",
        },
        {
            field: "assignedTo",
            headerName: "Assigned",
            valueGetter: userEmailValueGetter("assignedTo"),
            flex: 2,
            align: "left",
        },
        {
            field: "userId",
            headerName: "Created By",
            valueGetter: userEmailValueGetter("userId"),
            flex: 2,
            align: "left",
        },
    ];

    return (
        <div className="flex h-1/2 flex-col justify-between">
            <Typography
                variant="h3"
                className="text-center text-2xl uppercase tracking-widest"
            >
                {complete ? "Completed" : "Incomplete"} Tasks
            </Typography>
            {editTask && task !== null && (
                <EditTask
                    loading={loading}
                    setLoading={setLoading}
                    editTask={editTask}
                    handleClose={() => setEditTask(false)}
                    users={users}
                    events={events}
                    task={task!}
                />
            )}
            <DeleteTask
                deleteTask={deleteTask}
                handleClose={() => setDeleteTask(false)}
                task={tasks.filter((task) => task.uid === deleteKey).at(0)}
                loading={loading}
                setLoading={setLoading}
            />
            <DataGrid
                rows={tasks.map((task) => {
                    return { ...tasks, id: task.uid };
                })}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5]}
                className="h-[92%] text-bgColor"
            />
        </div>
    );
};
