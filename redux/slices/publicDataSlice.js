import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: 0,
  loading: false,
  error: null,
  data: null,
  product: null,
  productLoading: false,
  productError: null,
};

export const fetchProductById = createAsyncThunk(
  "example/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/handlers/visitor/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const fetchPageData = createAsyncThunk(
  "publicData/fetchPageData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/handlers/visitor/pageData");
      return response.data[0];
    } catch (error) {
      console.error("Failed to fetch page data:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch page data.");
    }
  }
);

export const publicDataSlice = createSlice({
  name: "publicData",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload;
      })
      .addCase(fetchPageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default publicDataSlice.reducer;
