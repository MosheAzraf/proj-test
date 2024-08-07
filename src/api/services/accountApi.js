import axiosClient from '../axiosClient'

export const loginAccount = async (userData) => {
    try {
        const resp = await axiosClient.post("/account/login", userData);
        return resp.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const getCurrentUser = async () => {
    const response = await axiosClient.get('/account/me');
    return response.data;
  };

