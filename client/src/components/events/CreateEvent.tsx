import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Form } from "..";
import { AuthContext, MessageContext } from "../../contexts";
import { FormField, UserDetails, ValidationSchemaInterface } from "../../types";
// import { createSiteSchema } from "@validators";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { BACKEND_URI } from "../../constants";
import { removeFalseyValues } from "../../utils";
import { createEventSchema } from "../../validators/createEventSchema";

interface PropsInterface {
    addSite: boolean;
    handleClose(): void;
    loading: boolean;
    setLoading(arg0: boolean): void;
    users: UserDetails[];
}

export const CreateSite = ({
    addSite,
    handleClose,
    loading,
    setLoading,
    users,
}: PropsInterface) => {
    const [formFields, setFormFields] = useState<FormField[]>([]);

    const { showMessage } = useContext(MessageContext)!;
    const authContext = useContext(AuthContext)!;

    useEffect(() => {
        if (users.length === 0) return;
        setFormFields([
            { label: "Name", name: "name", type: "text" },
            { label: "Channel ID", name: "channel", type: "text" },
            { label: "API Key", name: "apiKey", type: "text" },
            { label: "Latitude", name: "lat", type: "text" },
            { label: "Longitude", name: "long", type: "text" },
            // { label: "testlabel", name: "long", type: "option" },
        ]);
    }, [users]);

    return (
        <Dialog
            open={addSite}
            onClose={
                loading
                    ? () => {
                          showMessage(
                              "Can't close the dialog box right now. Deleting the given user.",
                              "warning"
                          );
                      }
                    : handleClose
            }
            color="primary"
        >
            <DialogTitle>Add a new Site</DialogTitle>
            <DialogContent>
                <Form
                    buttonText="Create Site"
                    loading={loading}
                    initialValues={{
                        name: "",
                        channel: "",
                        apiKey: "",
                        lat: "",
                        long: "",
                        guest: "",
                        hod: "",
                        xen: "",
                        je: "",
                        ae: "",
                        operator: "",
                    }}
                    validationSchema={
                        createEventSchema as unknown as ValidationSchemaInterface
                    }
                    formFields={formFields}
                    onSubmit={(values: Record<string, string>) => {
                        setLoading(true);
                        axios
                            .post(
                                `${BACKEND_URI}/site`,
                                removeFalseyValues(values),
                                {
                                    headers: authContext.headers,
                                }
                            )
                            .then((resp) => {
                                showMessage(resp.data.message, "success");
                                handleClose();
                            })
                            .catch((e) => {
                                if (e instanceof AxiosError) {
                                    showMessage(
                                        e.response?.data.message,
                                        "error"
                                    );
                                }
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    disabled={loading}
                    color="warning"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
