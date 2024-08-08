import { useQuery, QueryClient } from "@tanstack/react-query"
import { getCurrentUser } from "../api/services/accountApi"

export const useCurrentUser = () => {
    const token = localStorage.getItem("token");


    const { isFetching: isLoading, data: user, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        enabled: !!token,
        retry:1,
    })

    return {isLoading, user, error}
}