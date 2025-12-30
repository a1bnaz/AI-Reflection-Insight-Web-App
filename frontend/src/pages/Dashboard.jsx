import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

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
    const currentUser = useAuthStore((state) => state.user);

    if(isLoading) return <div>loading your dashboard...</div>
    if(isError) return <div>Error: {error.message}</div>

    return (
        <>
            <h1>User Dashboard</h1>
            <h2>Welcome back {currentUser?.username}!</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </>
    )
}

export default Dashboard;