import { createSlice } from '@reduxjs/toolkit'
import { decodeJwt } from 'jose'

export enum Roles {
  User,
  Admin
}

export interface AuthState {
  user: {
    id: string,
    email: string,
    roles: Roles[]
  } | null,
  token: string | null
}


const authState = { user: null, token: null} as AuthState

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      const tokenPayload = decodeJwt<typeof authState.user>(accessToken)
        state.user = {
          id: tokenPayload.id,
          email: tokenPayload.email,
          roles: tokenPayload.roles
      }
      
      state.token = accessToken
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token