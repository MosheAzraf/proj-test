import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    knownAs:null,
    token: localStorage.getItem('token') || null,
    roles:[],
    isLoading:false,
  }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser:(state, action) => {
        state.currentUser = action.payload.currentUser,
        state.knownAs = action.payload.knownAs,
        state.token = action.payload.token,
        state.roles = action.payload.roles || [];
        localStorage.setItem('token', action.payload.token);
      },
      clearUser:(state) => {
        state.currentUser = null,
        state.knownAs = null,
        state.token = null,
        state.roles = null,
        localStorage.removeItem('token');
      },
      setLoading: (state, action) => {
        state.isLoading = action.payload
      },
    },
  })
  
export const { setUser, clearUser, setLoading } = authSlice.actions
  
export default authSlice.reducer