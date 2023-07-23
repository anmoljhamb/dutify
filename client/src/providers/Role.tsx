import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { RoleContext } from "../contexts";
import { db } from "../firebase";
import { LoadingPage } from "../pages";
import { AutoCompleteOption, Role } from "../types";

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

    const rolesChoices = useMemo(() => {
        const temp: AutoCompleteOption[] = [];
        Object.keys(roles).forEach((key) => {
            temp.push({
                label: roles[key].roleName,
                value: key,
            });
        });
        return temp.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            } else if (b.label > a.label) {
                return 1;
            }
            return 0;
        });
    }, [roles]);

    const getRole = (uid: string) => {
        return roles[uid]!;
    };

    return (
        <RoleContext.Provider value={{ getRole, roles, rolesChoices }}>
            {loading && <LoadingPage />}
            {!loading && children}
        </RoleContext.Provider>
    );
};
