import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    loading: false,
    error: null,
    data: null, // For storing fetched data
};


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


export const publicDataSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// Export actions
export const { increment, decrement, incrementByAmount } = publicDataSlice.actions;

// Export the reducer
export default publicDataSlice.reducer;
