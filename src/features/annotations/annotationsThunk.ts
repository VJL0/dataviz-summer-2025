import { createAsyncThunk } from "@reduxjs/toolkit";
import { Annotation } from "@/app/types";
import { getElementByGraphId, sendMessageToBackground } from "@/utils";

interface AnnotationResponse {
  svg: string;
}

export const fetchAnnotationByTopicId = createAsyncThunk<
  Annotation, // return type
  string // topicId
>("annotations/fetchByTopicId", async (topicId) => {
  try {
    const svgElement = getElementByGraphId<SVGSVGElement>(topicId);

    const response = await sendMessageToBackground<AnnotationResponse>({
      type: "FETCH_SVG",
      payload: { svgHTML: svgElement.outerHTML, topic: topicId },
    });

    return {
      svg: response.svg,
      status: "succeeded",
      error: null,
    };
  } catch (err: any) {
    throw new Error(err?.message || "Unknown error");
  }
});
