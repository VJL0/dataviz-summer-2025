import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSelectedChartId } from "../features/ui/uiSlice";
import CurriculumResults from "./CurriculumResults";
import Overlay from "./Overlay";

interface ResultsProps {
  selectedChartId: string;
}

const Results: React.FC<ResultsProps> = ({ selectedChartId }) => {
  const dispatch = useAppDispatch();
  const curriculum = useAppSelector(
    (state) => state.curriculums.byChartId[selectedChartId],
  );
  const onClose = () => {
    dispatch(setSelectedChartId(null));
  };

  switch (curriculum.status) {
    case "loading":
      return <Overlay message="Loading..." onClose={onClose} />;
    case "failed":
      return (
        <Overlay message="Sorry, unable to fetch data." onClose={onClose} />
      );
    case "succeeded":
      return (
        <>
          <Overlay onClose={onClose} />
          <CurriculumResults />
        </>
      );
  }
};
export default Results;
