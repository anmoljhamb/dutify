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
import { DeleteEvent } from ".";
import { FetchedEvent } from "../../types";
// import { DeleteSite, EditSite } from ".";
// import { getUserByUid } from "../../utils";
export const EventsList = ({
    events,
    loading,
    setLoading,
}: {
    events: FetchedEvent[];
    loading: boolean;
    setLoading: (arg0: boolean) => void;
}) => {
    const [editSite, setEditSite] = useState<boolean>(false);
    const [deleteSite, setDeleteSite] = useState<boolean>(false);
    const [, setEditKey] = useState<string>("");
    const [deleteKey, setDeleteKey] = useState<string>("");
    const [site, setSite] = useState<FetchedEvent | null>(null);

    const getDetailsFromParams = (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => {
        return events.filter((site) => site.uid === params.row.id).at(0);
    };

    const valueGetter = (key: string) => {
        return (params: GridValueGetterParams) => {
            const temp = getDetailsFromParams(params);
            if (key === "done") {
                return temp?.done ? "Complete" : "Incomplete";
            }
            return temp?.[key as keyof FetchedEvent] || "NA";
        };
    };

    const userEmailValueGetter = (key: string) => {
        return (parmas: GridValueGetterParams) => {
            const temp = getDetailsFromParams(parmas);
            const uid = temp?.[key as keyof FetchedEvent];
            if (!uid) return "NA";
            // const user = getUserByUid(users, uid as string);
            return "NA";
        };
    };

    const handleDelete = (key: string) => {
        return () => {
            setDeleteKey(key);
            setDeleteSite(true);
        };
    };

    const handleEdit = (key: string) => {
        return () => {
            setEditKey(key);
            setEditSite(true);
            const tempSite = events.filter((site) => site.uid === key).at(0)!;
            setSite(tempSite);
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
            field: "done",
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
    ];

    return (
        <>
            {/* {editSite && site !== null && (
                <EditSite
                    loading={loading}
                    setLoading={setLoading}
                    editSite={editSite}
                    handleClose={() => setEditSite(false)}
                    users={users}
                    site={site!}
                />
            )} */}
            <DeleteEvent
                deleteSite={deleteSite}
                handleClose={() => setDeleteSite(false)}
                event={events.filter((site) => site.uid === deleteKey).at(0)}
                loading={loading}
                setLoading={setLoading}
            />
            <DataGrid
                rows={events.map((user) => {
                    return { ...events, id: user.uid };
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
