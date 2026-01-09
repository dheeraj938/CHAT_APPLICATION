import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUser, setSearchInput } from "../redux/userSlice"
import axios from "axios"

const useGetAuthUser = () => {
    const dispatch = useDispatch()
    const { authUser } = useSelector(store => store.user)

    useEffect(() => {
        const checkAuthUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/user/me", {
                    withCredentials: true
                })
                if (res.data) {
                    dispatch(setAuthUser(res.data))
                    dispatch(setSearchInput(""))  // Clear search input on login
                }
            } catch (error) {
                console.log("No authenticated user:", error.message)
                dispatch(setAuthUser(null))
            }
        }

        if (!authUser) {
            checkAuthUser()
        }
    }, [dispatch, authUser])
}

export default useGetAuthUser
