import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import uiReducer from "../features/ui/uiSlice";
import chartsReducer from "../features/charts/chartsSlice";
import curriculumsReducer from "../features/curriculums/curriculumsSlice";
import topicsReducer from "../features/topics/topicsSlice";
import annotationsReducer from "../features/annotations/annotationsSlice";
import visitedReducer from "../features/visited/visitedSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    charts: chartsReducer,
    curriculums: curriculumsReducer,
    topics: topicsReducer,
    annotations: annotationsReducer,
    visited: visitedReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const dff = {
  ui: {
    isVisible: false,
    overlay: {
      isVisible: false,
      message: "Select a chart to begin",
    },
    selection: {
      chartId: null,
      topicId: "<topicId2>",
    },
  },

  charts: {
    detected: [],
  },

  curriculums: {
    byChartId: {
      "<svgId1>": {
        topicIds: ["<topicId1>", "<topicId2>"],
        visitedTopicsById: {
          "<topicId1>": 1689553200000,
          "<topicId2>": 1689554000000,
        },
        status: "succeeded",
        error: null,
      },
      "<svgId2>": {
        topicIds: [],
        visitedTopicsById: {},
        status: "loading",
        error: null,
      },
    },
  },

  topics: {
    byTopicId: {
      "<topicId1>": {
        id: "<topicId1>",
        title: "...",
        description: "...",
        content: "...",
        svgId: "<svgId1>",
      },
      "<topicId2>": {
        id: "<topicId2>",
        title: "...",
        description: "...",
        content: "...",
        svgId: "<svgId1>",
      },
    },
  },

  annotations: {
    byTopicId: {
      "<topicId1>": {
        svg: "<svg>...</svg>",
        status: "loading",
        error: null,
      },
    },
  },
};
