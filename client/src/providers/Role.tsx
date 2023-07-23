import { useEffect, useState } from "react";
import { RoleContext } from "../contexts";
import { LoadingPage } from "../pages";
import { Role } from "../types";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface PropsInterface {
    children: React.ReactNode;
}

export const RoleProvider = ({ children }: PropsInterface) => {
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState<Record<string, Role>>({});

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "roles"), (docsRef) => {
            docsRef.docs.forEach((doc) => {
                setRoles((old) => {
                    return { ...old, [doc.id]: doc.data() as Role };
                });
            });
            setLoading(false);
        });
        return unsub;
    }, []);

    const getRole = (uid: string) => {
        return roles[uid]!;
    };

    return (
        <RoleContext.Provider value={{ getRole }}>
            {loading && <LoadingPage />}
            {!loading && children}
        </RoleContext.Provider>
    );
};
