import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import wishService from './wishService'

const initialState = {
  wish: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new wish
export const createWish = createAsyncThunk(
  'wish/create',
  async (wishData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await wishService.createWish(wishData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user wish
export const getWish = createAsyncThunk(
  'wish/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await wishService.getWish(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user wish
export const deleteWish = createAsyncThunk(
  'wish/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await wishService.deleteWish(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWish.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createWish.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wish.push(action.payload)
      })
      .addCase(createWish.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getWish.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWish.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wish = action.payload
      })
      .addCase(getWish.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteWish.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteWish.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wish = state.wish.filter(
          (wish) => wish._id !== action.payload.id
        )
      })
      .addCase(deleteWish.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = wishSlice.actions
export default wishSlice.reducer