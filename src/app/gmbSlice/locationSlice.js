import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosInstance } from 'utils/AxiosInstance';

// Define an async thunk for validating the token and fetching user details
export const fetchLocation = createAsyncThunk(
  'gmb/getLocation',
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      const accountName = localStorage.getItem('gmb_account_name');
      const gmb_account_id = localStorage.getItem('gmb_account_id');
      const accessToken = localStorage.getItem('gmb_access_token');

      if (!token) {
        return thunkAPI.rejectWithValue('No token provided');
      }

      const response = await AxiosInstance.get(
        `gmb/get-location?access_token=${accessToken}&place_id=${payload.id}&gmb_account_id=${gmb_account_id}`,
        {
          headers: {
            Authorization: `${token}`, // Correctly format the Authorization header
          },
        }
      );

      if(response.status == 400){
        return location.href = "/404"
      }
      if(response.status == 500){
        return location.href = "/404"
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An error occurred while fetching location details.');
      }
    }
  }
);

// Create a slice to handle user state
const locationSlice = createSlice({
  name: 'location',
  initialState: {
    loading: false,
    error: null,
    data: {},
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
