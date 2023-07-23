import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import { AuthContextInterface, UserDetails } from "../types";
import axios from "axios";
import { BACKEND_URI } from "../constants";

export const useFetchUsers = ({
    usersFetch,
    setLoading,
}: {
    usersFetch?: boolean;
    setLoading: (arg0: boolean) => void;
}) => {
    const [users, setUsers] = useState<UserDetails[]>([]);

    const authContext = useContext(AuthContext) as AuthContextInterface;

    useEffect(() => {
        axios
            .get(`${BACKEND_URI}/user`, {
                headers: authContext.headers,
            })
            .then((resp) => {
                setUsers(resp.data as UserDetails[]);
            })
            .catch((err) => {
                console.trace(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [authContext.token, usersFetch, setLoading, authContext.headers]);

    return users;
};
