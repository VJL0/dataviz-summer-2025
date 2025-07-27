import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnnotationsState, Annotation, Status } from "../../app/types";

const initialState: AnnotationsState = {
  byTopicId: {},
};

const annotationsSlice = createSlice({
  name: "annotations",
  initialState,
  reducers: {
    setAnnotation(
      state,
      action: PayloadAction<{ topicId: string; annotation: Annotation }>,
    ) {
      state.byTopicId[action.payload.topicId] = action.payload.annotation;
    },
    updateAnnotationStatus(
      state,
      action: PayloadAction<{ topicId: string; status: Status }>,
    ) {
      if (state.byTopicId[action.payload.topicId]) {
        state.byTopicId[action.payload.topicId].status = action.payload.status;
      }
    },
    updateAnnotationError(
      state,
      action: PayloadAction<{ topicId: string; error: string | null }>,
    ) {
      if (state.byTopicId[action.payload.topicId]) {
        state.byTopicId[action.payload.topicId].error = action.payload.error;
      }
    },
    removeAnnotation(state, action: PayloadAction<string>) {
      delete state.byTopicId[action.payload];
    },
  },
});

export const {
  setAnnotation,
  updateAnnotationStatus,
  updateAnnotationError,
  removeAnnotation,
} = annotationsSlice.actions;

export default annotationsSlice.reducer;
