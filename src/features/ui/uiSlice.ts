import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "@/app/types";

const initialState: UIState = {
  isVisible: false,
  overlay: {
    isVisible: true,
    message: "loading...",
  },
  selection: {
    chartId: null,
    topicId: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAppVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
    setOverlayVisible(state, action: PayloadAction<boolean>) {
      state.overlay.isVisible = action.payload;
    },
    setOverlayMessage(state, action: PayloadAction<string>) {
      state.overlay.message = action.payload;
    },
    setSelection(
      state,
      action: PayloadAction<{ chartId: string | null; topicId: string | null }>,
    ) {
      state.selection = action.payload;
    },
    setSelectedChartId(state, action: PayloadAction<string | null>) {
      state.selection.chartId = action.payload;
    },
    setSelectedTopicId(state, action: PayloadAction<string | null>) {
      state.selection.topicId = action.payload;
    },
  },
});

export const {
  setAppVisible,
  setOverlayVisible,
  setOverlayMessage,
  setSelection,
  setSelectedChartId,
  setSelectedTopicId,
} = uiSlice.actions;

export default uiSlice.reducer;
