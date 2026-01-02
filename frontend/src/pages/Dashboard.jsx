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

    function handleLogoutButton(){
        useAuthStore.getState().logout();
    }

    if(isLoading) return <div>loading your dashboard...</div>
    if(isError) return <div>Error: {error.message}</div>

    return (
        <>
            <h1>User Dashboard</h1>
            <h2>Welcome back {currentUser?.username}!</h2>
            <hr></hr>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
            <button className="border rounded bg-red-500 text-white px-4 py-2 mt-4 cursor-pointer hover:bg-red-600 transition-colors"
                onClick={() => useAuthStore.getState().logout()}
            >
                Logout
            </button>
            
        </>
    )
}

export default Dashboard;