import { useAppSelector } from "@/app/hooks";
import Overlay from "./Overlay";
import ExpertGogglesCard from "./ExpertGogglesCard";
import ChartCard from "./ChartCard";

interface ResultsProps {
  selectedChartId: string;
}

const Results: React.FC<ResultsProps> = ({ selectedChartId }) => {
  const curriculum = useAppSelector(
    (state) => state.curriculums.byChartId[selectedChartId],
  );
  const visible = useAppSelector((state) => state.ui.overlay.isVisible);

  switch (curriculum.status) {
    case "loading":
      return <Overlay message="Loading..." showCloseButton />;
    case "failed":
      return <Overlay message="Sorry, unable to fetch data." showCloseButton />;
    case "succeeded":
      return (
        <>
          {visible && <Overlay />}
          <div className="absolute inset-0 grid h-full grid-cols-2 items-center gap-4 align-middle">
            <div className="">
              <ChartCard />
            </div>
            <div className="">
              <ExpertGogglesCard />
            </div>
          </div>
        </>
      );
  }
};
export default Results;
