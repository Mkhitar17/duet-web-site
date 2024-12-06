import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";



export const fetchTestData = createAsyncThunk(
    'example/fetchTestData',
    async (_, thunkAPI) => {
        try {
            // Simulate an API call with a delay
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({ data: 'Fetched Data' }), 1000)
            );
            return response.data; // This will be the "fulfilled" payload
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);


export const fetchPageData = createAsyncThunk(
    "admin/fetchPageData",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/api/handlers/visitor/pageData");
            return response.data[0]; // Assuming the first document is the pageData
        } catch (error) {
            console.error("Failed to fetch page data:", error);
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch page data.");
        }
    }
);


export const savePageData = createAsyncThunk(
    "admin/savePageData",
    async (updatedFields, thunkAPI) => {
        try {
            // Get the current state from Redux
            const state = thunkAPI.getState().admin.pageData;

            // Combine the updated fields with the rest of the state
            const combinedPageData = {
                ...state,
                ...updatedFields, // Overwrite or add updated fields
            };

            console.log("Combined Page Data being sent:", combinedPageData);

            // Send the combined data to the API
            const response = await axios.put("/api/handlers/admin/updatePageData", combinedPageData);

            return response.data;
        } catch (error) {
            console.error("Failed to save page data:", error);
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to save page data.");
        }
    }
);


export const adminSlice = createSlice({
    name: "admin",
    initialState: {
      pageData: null,
      isLoading: false,
      error: null,
      hasChanges: false,
    },
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPageData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchPageData.fulfilled, (state, action) => {
            state.pageData = action.payload.pageData;
            state.isLoading = false;
          })
          .addCase(fetchPageData.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
          })
          .addCase(savePageData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(savePageData.fulfilled, (state, action) => {
            state.pageData = action.payload.pageData;
            state.isLoading = false;
            state.hasChanges = false;
          })
          .addCase(savePageData.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
          });
      },
});

// Export actions
// export const { increment, decrement, incrementByAmount } = adminSlice.actions;

// Export the reducer
export default adminSlice.reducer;
