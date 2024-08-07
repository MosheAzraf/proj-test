import { useQuery, QueryClient } from "@tanstack/react-query"
import { getCurrentUser } from "../api/services/accountApi"

export const useCurrentUser = (token) => {


    const { isFetching: isLoading, data: user, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        enabled: !!localStorage.getItem("token"),
        retry:1,
    })

    return {isLoading, user, error}
}