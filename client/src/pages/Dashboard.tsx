import { useFetchProjects } from "../hooks";

export const Dashboard = () => {
    // const authContext = useContext(AuthContext)!;
    const { events } = useFetchProjects();

    return (
        <div className="flex h-full flex-col items-center justify-center">
            {/* <h1> {events.length}</h1> */}
        </div>
    );
};
