import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice";


const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const [onlineUsersList, setOnlineUsersList] = useState([]);

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                console.log("[useGetOtherUsers] Fetching other users...");
                
                const res = await axios.get(
                    `http://localhost:8080/api/v1/user/`,
                    { withCredentials: true }
                );
                
                console.log("[useGetOtherUsers] Response:", res.data);
                
                if (Array.isArray(res.data)) {
                    dispatch(setOtherUsers(res.data));
                } else if (res.data.users && Array.isArray(res.data.users)) {
                    dispatch(setOtherUsers(res.data.users));
                } else {
                    console.log("[useGetOtherUsers] Unexpected response format:", res.data);
                    dispatch(setOtherUsers([]));
                }
            } catch (error) {
                console.error("[useGetOtherUsers] Error:", error.message);
                console.error("[useGetOtherUsers] Full error:", error);
                dispatch(setOtherUsers([]));
            }
        }

        fetchOtherUsers();
    }, [dispatch])
}

export default useGetOtherUsers
