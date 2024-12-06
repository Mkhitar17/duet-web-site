import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to check authentication
export const checkAuthentication = createAsyncThunk('auth/checkAuthentication', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/handlers/admin/verify', { withCredentials: true });
    return data.admin; // Return admin details
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Authentication failed');
  }
});


export const signIn = createAsyncThunk('auth/signIn', async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/handlers/admin/signin', credentials, { withCredentials: true });
      return data.admin; // Return admin details
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Sign-in failed');
    }
  });


  export const signUp = createAsyncThunk('auth/signUp', async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/handlers/admin/signup', credentials);
      return data.admin; // Return admin details
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Sign-up failed');
    }
  });

  export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
      // Remove the token from cookies
      await axios.post('/api/handlers/admin/logout', {}, { withCredentials: true });
      return true; // Indicate logout success
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  });

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    admin: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.admin = action.payload;
        state.loading = false;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.admin = null;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.admin = action.payload;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.admin = null;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Set success message
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.admin = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
