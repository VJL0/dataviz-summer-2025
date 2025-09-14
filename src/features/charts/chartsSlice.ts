import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chart } from "@/app/types";

const initialState: Chart = {
  detected: [],
};

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setDetectedCharts(state, action: PayloadAction<string[]>) {
      state.detected = action.payload;
    },
  },
});

export const { setDetectedCharts } = chartsSlice.actions;
export default chartsSlice.reducer;
