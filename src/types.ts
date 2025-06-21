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
