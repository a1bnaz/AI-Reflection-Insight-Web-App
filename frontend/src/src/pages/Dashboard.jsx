import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useUsers(){
    return useQuery({
        queryKey: ["user"], // the "ID" for this data in the cache
        queryFn: async () => {
            const response = await api.get("/users");
            return response.data;
        },
    });
};


function Dashboard(){
    const {data: users, isLoading, isError, error} = useUsers();

    if(isLoading) return <div>Loading yoru team...</div>
    if(isError) return <div>Error: {error.message}</div>

    return (
        <>
            <h1>User Dashboard</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </>
    )
}

export default Dashboard;