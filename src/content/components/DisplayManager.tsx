import { useEffect } from "react";
import {
  closeReactApp,
  openReactApp,
  getSvgReference,
  sendChromeMessage,
} from "../utils";
import LoadingOverlay from "./LoadingOverlay";
import { useCurriculumContext } from "../context/CurriculumContext";
import { Topic, RawTopic } from "../types";
import ResultsPage from "./ResultsPage";

const DisplayManager = () => {
  // Get state and helper functions from ManagerContext.
  const {
    setSelectedCurriculum,
    updateCurriculum,
    curriculumMapRef,
    getSelectedCurriculum,
  } = useCurriculumContext();

  useEffect(() => {
    // Async handler for chrome.storage changes.
    const handleStorageChange = async (changes: any) => {
      if (changes.svgId) {
        const newSvgId: string = changes.svgId.newValue;
        if (!newSvgId) return; // Invalid SVG ID

        const svgElement = getSvgReference(newSvgId);
        if (!svgElement) return; // Unable to get the SVG element

        openReactApp();

        // Use the ref to get the latest curriculum.
        const foundCurriculum = curriculumMapRef.current.get(newSvgId);
        if (foundCurriculum) {
          // If curriculum exists already, update selection.
          setSelectedCurriculum(newSvgId);
          return;
        }

        // Before starting the fetch, update the curriculum with a "loading" status.
        updateCurriculum({
          svgId: newSvgId,
          status: "loading",
          topics: [],
          visitedTopics: new Set(),
        });
        setSelectedCurriculum(newSvgId);

        // Fetch curriculum data.
        try {
          const curriculumResponse = await sendChromeMessage({
            type: "FETCH_CURRICULUM",
            payload: { svgHTML: svgElement.outerHTML },
          });

          const fetchedTopics: Topic[] = curriculumResponse.curriculum.map(
            (topic: RawTopic) => ({
              ...topic,
              svgStatus: "idle",
              newSvg: "",
            }),
          );

          updateCurriculum({
            svgId: newSvgId,
            status: "success",
            topics: fetchedTopics,
            visitedTopics: new Set(),
          });
          setSelectedCurriculum(newSvgId);
        } catch (error) {
          updateCurriculum({
            svgId: newSvgId,
            status: "failure",
            topics: [],
            visitedTopics: new Set(),
          });
          setSelectedCurriculum(newSvgId);
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  // Retrieve the selected curriculum using the context getter.
  const currentSelected = getSelectedCurriculum();
  if (!currentSelected) return;

  const handleClose = () => {
    updateCurriculum(currentSelected);
    setSelectedCurriculum(currentSelected.svgId);
    closeReactApp();
  };

  switch (currentSelected.status) {
    case "loading":
      return <LoadingOverlay message="loading..." onClose={handleClose} />;
    case "failure":
      return (
        <LoadingOverlay
          message="Sorry, unable to fetch data."
          onClose={handleClose}
        />
      );
    case "success":
      return <ResultsPage />;
  }
};

export default DisplayManager;
