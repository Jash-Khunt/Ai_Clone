  import { useEffect, useState } from "react";
  import api from "../utils/api";
  import { useDispatch } from "react-redux";
  import { setBoardId } from "../store/slices/worksheetSlice";

  interface Option {
    label: string;
    value: string;
    name?: string;
  }

  export const useCurriculumData = (countryCode: string) => {
    const [curriculumOptions, setCurriculumOptions] = useState<Option[]>([]);

    useEffect(() => {
      api
        .get(`/curriculum?countryCode=${countryCode}`)
        .then((res) => {
          const items = res.data?.data || [];
          setCurriculumOptions(
            items.map((item: any) => ({
              label: item.board_name,
              value: item.board_id.toString(),
              name: item.board_name,
            }))
          );
        })
        .catch(console.error);
    }, [countryCode]);

    return { curriculumOptions };
  };

  export const useGradeData = (
    curriculum: string,
    stateBoardState: string,
    onBoardIdResolved: (boardId: string) => void
  ) => {
    const [gradeOptions, setGradeOptions] = useState<Option[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchGrades = async () => {
        if (!curriculum) return;

        try {
          if (curriculum === "state" && stateBoardState) {
            const res = await api.get(
              `/grade/by-state?stateName=${stateBoardState}`
            );
            const items = res.data?.data || [];
            if (items.length > 0 && items[0].board_id) {
              const boardId = items[0].board_id.toString();
              dispatch(setBoardId(boardId));
              onBoardIdResolved(boardId);
            }
            setGradeOptions(
              items.map((g: any) => ({
                label: g.grade_name,
                value: g.grade_id.toString(),
              }))
            );
          } else if (curriculum !== "state") {
            const res = await api.get(`/grade/${curriculum}`);
            const items = res.data?.data || [];
            dispatch(setBoardId(curriculum));
            onBoardIdResolved(curriculum);
            setGradeOptions(
              items.map((g: any) => ({
                label: g.grade_name,
                value: g.grade_id.toString(),
              }))
            );
          }
        } catch (err) {
          console.error("Error fetching grades:", err);
        }
      };

      fetchGrades();
    }, [curriculum, stateBoardState]);

    return { gradeOptions };
  };

  export const useSubjectData = (grade: string) => {
    const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);

    useEffect(() => {
      if (!grade) return;

      api
        .get(`/subject/${grade}`)
        .then((res) => {
          const items = res.data?.data || [];
          setSubjectOptions(
            items.map((s: any) => ({
              label: s.subject_name,
              value: s.subject_id.toString(),
            }))
          );
        })
        .catch(console.error);
    }, [grade]);

    return { subjectOptions };
  };

  export const useStateOptions = (showState: boolean, countryCode: string) => {
    const [stateOptions, setStateOptions] = useState<Option[]>([]);

    useEffect(() => {
      if (showState) {
        api
          .get(`/states?countryCode=${countryCode}`)
          .then((res) => {
            const items = res.data?.data || [];
            setStateOptions(
              items.map((s: any) => ({
                label: s.state_name,
                value: s.state_name,
              }))
            );
          })
          .catch(console.error);
      }
    }, [showState, countryCode]);

    return { stateOptions };
  };

  export const useQuestionTypes = (boardId?: string, questionCategory?: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [boardError, setBoardError] = useState("");
    const [loadingQuestionTypes, setLoadingQuestionTypes] = useState(true);
    const [questionTypes, setQuestionTypes] = useState<string[]>([]);

    useEffect(() => {
      const fetchQuestionTypes = async () => {
        setLoadingQuestionTypes(true);
        setBoardError("");

        if (!boardId || boardId === "-") {
          setBoardError(
            "Board ID not found. Please go back and select a valid curriculum/state."
          );
          setLoadingQuestionTypes(false);
          return;
        }

        try {
          const params: any = { boardId: boardId };
          if (questionCategory) {
            params.questionCategory = questionCategory;
          }
          const res = await api.get(`/question-types`, { params });

          if (res.data?.success && Array.isArray(res.data.data)) {
            setQuestionTypes(res.data.data);
          } else {
            setBoardError("No question types found for this board and category.");
          }
        } catch (err) {
          console.error("Error fetching question types:", err);
          setBoardError("Failed to fetch question types.");
        } finally {
          setLoadingQuestionTypes(false);
        }
      };

      fetchQuestionTypes();
    }, [boardId, questionCategory]);

    return { questionTypes, loading, error };
  };
