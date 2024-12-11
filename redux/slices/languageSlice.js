import { createSlice } from "@reduxjs/toolkit";

export const initializeLocale = () => (dispatch) => {
  if (typeof window !== "undefined") {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale) {
      dispatch(setLocale(storedLocale));
    } else {
      dispatch(setLocale("arm"));
      localStorage.setItem("locale", "arm");
    }
  }
};


const initialState = {
  locale: "arm", 
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", action.payload);
      }
    },
  },
});

export const { setLocale } = languageSlice.actions;
export default languageSlice.reducer;
