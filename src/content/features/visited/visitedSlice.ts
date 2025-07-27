import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VisitedState } from "../../app/types";

const initialState: VisitedState = {
  byTopicId: {},
  byChartId: {},
};

const visitedSlice = createSlice({
  name: "visited",
  initialState,
  reducers: {
    markTopicVisited(state, action: PayloadAction<string>) {
      const topicId = action.payload;
      state.byTopicId[topicId] = Date.now();
    },
    markChartVisited(state, action: PayloadAction<string>) {
      const chartId = action.payload;
      state.byChartId[chartId] = Date.now();
    },
  },
});

export const { markTopicVisited, markChartVisited } = visitedSlice.actions;
export default visitedSlice.reducer;
