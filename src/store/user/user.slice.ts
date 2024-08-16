import { getStoredLocal } from 'utils/local-storage'
import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from 'store/user/user.interface'
import { login, logout, register } from 'store/user/user.actions'

const initialState: IInitialState = {
	user: getStoredLocal('user'),
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
		// .addCase(checkAuth.fulfilled, (state, { payload }) => {
		// 	state.user = payload
		// })
	}
})
