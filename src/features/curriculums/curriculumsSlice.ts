import { createSlice } from "@reduxjs/toolkit";
import { CurriculumsState } from "@/app/types";
import { fetchCurriculumByChartId } from "./curriculumsThunks";

const initialState: CurriculumsState = {
  byChartId: {},
};

const curriculumsSlice = createSlice({
  name: "curriculums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurriculumByChartId.pending, (state, action) => {
        const chartId = action.meta.arg;
        state.byChartId[chartId] = {
          topicIds: [],
          status: "loading",
          error: null,
        };
      })
      .addCase(fetchCurriculumByChartId.fulfilled, (state, action) => {
        const chartId = action.meta.arg;
        const curriculum = action.payload; // Return type of the thunk
        state.byChartId[chartId] = curriculum;
      })
      .addCase(fetchCurriculumByChartId.rejected, (state, action) => {
        const chartId = action.meta.arg;
        state.byChartId[chartId] = {
          topicIds: [],
          status: "failed",
          error: action.error.message || "Failed to fetch curriculum",
        };
      });
  },
});

export default curriculumsSlice.reducer;
