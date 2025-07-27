export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface UIState {
  isVisible: boolean;
  overlay: {
    isVisible: boolean;
    message: string;
  };
  selection: {
    chartId: string | null;
    topicId: string | null;
  };
}

export interface Chart {
  detected: string[];
}

export interface Curriculum {
  topicIds: string[];
  status: Status;
  error: string | null;
}

export interface CurriculumsState {
  byChartId: Record<string, Curriculum>;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  svgId: string;
}

export interface TopicsState {
  byTopicId: Record<string, Topic>;
}

export interface Annotation {
  svg: string;
  status: Status;
  error: string | null;
}

export interface AnnotationsState {
  byTopicId: Record<string, Annotation>;
}
export  interface VisitedState {
  byTopicId: Record<string, number>;
  byChartId: Record<string, number>;
}

export interface RootState {
  ui: UIState;
  charts: Chart;
  curriculums: CurriculumsState;
  topics: TopicsState;
  annotations: AnnotationsState;
  visited: VisitedState;
}
