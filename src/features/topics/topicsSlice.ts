import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopicsState, Topic } from "@/app/types";

const initialState: TopicsState = {
  byTopicId: {},
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopics(state, action: PayloadAction<Topic[]>) {
      state.byTopicId = {};
      action.payload.forEach((topic) => {
        state.byTopicId[topic.id] = topic;
      });
    },
    addTopic(state, action: PayloadAction<Topic>) {
      state.byTopicId[action.payload.id] = action.payload;
    },
    updateTopic(state, action: PayloadAction<Topic>) {
      if (state.byTopicId[action.payload.id]) {
        state.byTopicId[action.payload.id] = action.payload;
      }
    },
    removeTopic(state, action: PayloadAction<string>) {
      delete state.byTopicId[action.payload];
    },
  },
});

export const { setTopics, addTopic, updateTopic, removeTopic } =
  topicsSlice.actions;
export default topicsSlice.reducer;
