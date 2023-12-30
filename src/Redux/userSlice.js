import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name:'user',
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    userLoginInfo: (state, action) =>{
      state.user = action.payload
    },
  },
})

export const {userLoginInfo } = userSlice.actions

export default userSlice.reducer

