import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BACKEND_URI } from "../constants";
import { AuthContext } from "../contexts";
import { FetchedEvent } from "../types";

export const useFetchProjects = () => {
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthContext)!;
    const [events, setEvents] = useState<FetchedEvent[]>([]);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${BACKEND_URI}/event`, {
                headers: authContext.headers,
            })
            .then((resp) => {
                setEvents(resp.data);
                console.log(resp.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [authContext.headers]);

    return { isLoading, events };
};
