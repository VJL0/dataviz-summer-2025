import { createAsyncThunk } from "@reduxjs/toolkit";
import { Curriculum } from "@/app/types";
import { Message } from "@/types";
import { getElementByGraphId } from "@/utils";

// Helper to send typed message to background
function sendMessageToBackground<TResponse>(
  message: Message,
): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      const lastError = chrome.runtime.lastError;
      if (lastError) reject(lastError.message);
      else resolve(response);
    });
  });
}

interface CurriculumResponse {
  curriculum: {
    title: string;
    description: string;
    content: string;
  }[];
}

export const fetchCurriculumByChartId = createAsyncThunk<
  Curriculum, // Return type
  string // Argument type
>("curriculums/fetchByChartId", async (chartId) => {
  try {
    const svgElement = getElementByGraphId<SVGSVGElement>(chartId);

    const response = await sendMessageToBackground<CurriculumResponse>({
      type: "FETCH_CURRICULUM",
      payload: { svgHTML: svgElement.outerHTML },
    });

    const topicIds = response.curriculum.map((_, i) => `${chartId}-topic-${i}`);

    return {
      topicIds,
      status: "succeeded",
      error: null,
    };
  } catch (err: any) {
    throw new Error(err?.message || "Unknown error");
  }
});
