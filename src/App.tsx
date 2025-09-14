import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchCurriculumByChartId } from "./features/curriculums/curriculumsThunks";
import { setSelectedChartId } from "./features/ui/uiSlice";
import { markChartVisited } from "./features/visited/visitedSlice";
import FloatingIconManager from "@/components/FloatingIconManager";
import Results from "@/components/Results";
import SurveyLogin from "@/components/SurveyLogin";

type ChartMeta = {
  id: string;
  element: Element;
};

const App = () => {
  const dispatch = useAppDispatch();
  const selectedChartId = useAppSelector((state) => state.ui.selection.chartId);
  const visitedCharts = useAppSelector((state) => state.visited.byChartId);

  const [charts, setCharts] = useState<ChartMeta[]>([]);

  const handleIconClick = (id: string) => {
    if (!visitedCharts[id]) {
      dispatch(fetchCurriculumByChartId(id));
      dispatch(markChartVisited(id));
    }

    dispatch(setSelectedChartId(id));
  };

  return selectedChartId ? (
    <Results selectedChartId={selectedChartId} />
  ) : (
    <>
      <FloatingIconManager
        charts={charts}
        setCharts={setCharts}
        onIconClick={handleIconClick}
      />
      <SurveyLogin />
    </>
  );
};

export default App;
