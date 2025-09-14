export type Message =
  | FetchCurriculumMessage
  | FetchSvgMessage
  | FetchAnswerMessage;

export interface FetchCurriculumMessage {
  type: "FETCH_CURRICULUM";
  payload: {
    svgHTML: string;
  };
}

export interface FetchSvgMessage {
  type: "FETCH_SVG";
  payload: {
    svgHTML: string;
    topic: string;
  };
}

export interface FetchAnswerMessage {
  type: "FETCH_ANSWER";
  payload: {
    question: string;
    topic: string;
  };
}

export interface ChromeMessage {
  type: string;
  payload: any;
}

// ----------------------------
// Type Definitions for Context
// ----------------------------

export interface RawTopic {
  name: string;
  description: string;
  explanation: Explanation;
}

export type SvgId = string;
export type TopicName = string;

export type FetchStatus = "idle" | "loading" | "success" | "failure";

export interface Explanation {
  title: string;
  content: string;
}

export interface Topic {
  name: TopicName;
  description: string;
  explanation: Explanation;
  svgStatus: FetchStatus;
  newSvg: string;
}

export interface Curriculum {
  svgId: SvgId;
  status: string;
  topics: Topic[];
  visitedTopics: Set<TopicName>;
}

export interface CurriculumState {
  curriculumMap: Map<SvgId, Curriculum>;
  selectedCurriculumId?: SvgId;
  selectedTopicId?: TopicName;
}
