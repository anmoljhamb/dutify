/* eslint-disable @typescript-eslint/no-explicit-any */
import { Done, Undo } from "@mui/icons-material";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridTreeNodeWithRender,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { FetchedEvent, FetchedTask } from "../../types";
// import { DeleteSite, EditSite } from ".";
import axios from "axios";
import { BACKEND_URI } from "../../constants";
import { AuthContext, MessageContext } from "../../contexts";
import { getElementByUid } from "../../utils";

export const AssignedList = ({
    tasks,
    events,
}: {
    tasks: FetchedTask[];
    events: FetchedEvent[];
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext)!;
    const { showMessage } = useContext(MessageContext)!;

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

    const handleDone = (key: string) => {
        return () => {
            const tempTask = tasks.filter((task) => task.uid === key).at(0)!;
            axios
                .get(`${BACKEND_URI}/task/done?uid=${tempTask?.uid}`, {
                    headers: authContext.headers,
                })
                .then(() => {
                    showMessage("The task was marked as done.", "success");
                })
                .catch(() => {
                    showMessage("There was an error.", "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        };
    };

    const handleUndone = (key: string) => {
        return () => {
            const tempTask = tasks.filter((task) => task.uid === key).at(0)!;
            axios
                .get(`${BACKEND_URI}/task/undo?uid=${tempTask?.uid}`, {
                    headers: authContext.headers,
                })
                .then(() => {
                    showMessage("The task was marked as done.", "success");
                })
                .catch(() => {
                    showMessage("There was an error.", "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        };
    };

    const columns: GridColDef[] = [
        {
            field: "action",
            headerName: "Action",
            type: "actions",
            sortable: false,
            width: 100,
            align: "left",
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<Done />}
                        label="Mark as Done"
                        onClick={handleDone(id as string)}
                        className="text-bgColor"
                        disabled={loading}
                    />,
                    <GridActionsCellItem
                        icon={<Undo />}
                        label="Mark as Undone"
                        onClick={handleUndone(id as string)}
                        className="text-bgColor"
                        disabled={loading}
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
            field: "status",
            headerName: "Status",
            valueGetter: valueGetter("done"),
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
            field: "projectId",
            headerName: "Event",
            valueGetter: eventNameGetter("projectId"),
            flex: 2,
            align: "left",
        },
    ];

    return (
        <>
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
                className="text-bgColor"
            />
        </>
    );
};
