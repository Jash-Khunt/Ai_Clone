import { Dispatch } from 'redux';
import { setBoardId, setField } from '../store/slices/worksheetSlice';

export const resetFields = (dispatch: Dispatch, fields: string[]) => {
  fields.forEach((field) => {
    //@ts-ignore
    dispatch(setField({ key: field, value: '' }));
  });
};

type OptionWithOptionalName = {
  value: string;
  name?: string;
};

export const handleCurriculumChange = (
  value: string,
  curriculumOptions: OptionWithOptionalName[],
  dispatch: Dispatch,
  setCurriculumName: (name: string) => void
) => {
  const found = curriculumOptions.find((opt) => opt.value === value);
  const name = found?.name ?? ''; 
  setCurriculumName(name);

  dispatch(setField({ key: 'curriculum', value }));
  resetFields(dispatch, ['stateBoardState', 'grade', 'gradeName', 'subject', 'subjectName', 'customizations']);
  dispatch(setBoardId(''));
};

export const handleStateChange = (value: string, dispatch: Dispatch) => {
  dispatch(setField({ key: 'stateBoardState', value }));
  resetFields(dispatch, ['grade', 'gradeName', 'subject', 'subjectName', 'customizations']);
  dispatch(setBoardId(''));
};

export const handleGradeChange = (
  value: string, 
  gradeOptions: Array<{ value: string; label: string }>, 
  dispatch: Dispatch
) => {
  const selectedGrade = gradeOptions.find(option => option.value === value);
  if (selectedGrade) {
    dispatch(setField({ key: 'grade', value: selectedGrade.value }));
    dispatch(setField({ key: 'gradeName', value: selectedGrade.label }));
  }
  resetFields(dispatch, ['subject', 'subjectName', 'customizations']);
};

export const handleSubjectChange = (
  value: string, 
  subjectOptions: Array<{ value: string; label: string }>, 
  dispatch: Dispatch
) => {
  const selectedSubject = subjectOptions.find(option => option.value === value);
  if (selectedSubject) {
    dispatch(setField({ key: 'subject', value: selectedSubject.value }));
    dispatch(setField({ key: 'subjectName', value: selectedSubject.label }));
  }
};
