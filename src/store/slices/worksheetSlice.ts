import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FileMeta {
  uid: string;
  name: string;
  type: string;
  url: string;
  originFileObj?: File;
  galleryFile?: boolean;
  galleryId?: string;
  filePath?: string;
}

interface WorksheetState {
  inputMethod: 'upload' | 'type' | 'sample' | null; 
  curriculum: string;
  grade: string;
  gradeName: string; // ✅ NEW - store grade name
  subject: string;
  subjectName: string; // ✅ NEW - store subject name
  numberOfQuestions: string;
  stateBoardState: string;
  boardId: string;
  files: FileMeta[];
  topic: string;
  customizations: string[];
  questionTypes: string[]; // ✅ NEW - store multiple selected question types
  questionCategory: string; // ✅ NEW - store selected question category
  additionalFeatures: string[]; // ✅ NEW - store additional features
  difficultyLevel: 'Easy' | 'Medium' | 'Hard' | ''; // ✅ NEW
  questionText?: string;
  aiResponse?: string;
  worksheetId?: string; // ✅ NEW
  uploadedFiles?: any[]; // ✅ NEW - for gallery files
}

const initialState: WorksheetState = {
  inputMethod: null,
  curriculum: '',
  grade: '',
  gradeName: '', // ✅ NEW
  subject: '',
  subjectName: '', // ✅ NEW
  numberOfQuestions: '',
  stateBoardState: '',
  boardId: '',
  files: [],
  topic: '',
  customizations: [],
  questionTypes: [], // ✅ NEW
  questionCategory: '', // ✅ NEW
  additionalFeatures: [], // ✅ NEW
  difficultyLevel: 'Medium', // ✅ NEW - Default to Medium instead of empty string
  questionText: '',
  aiResponse: '',
  worksheetId: '', // ✅ NEW
  uploadedFiles: [], // ✅ NEW
};

const worksheetSlice = createSlice({
  name: 'worksheet',
  initialState,
  reducers: {
    setInputMethod: (state, action: PayloadAction<'upload' | 'type' | 'sample'>) => {
      state.inputMethod = action.payload;
    },
    setCurriculumData: (
      state,
      action: PayloadAction<{
        curriculum: string;
        grade: string;
        gradeName: string;
        subject: string;
        subjectName: string;
        numberOfQuestions: string;
        stateBoardState: string;
        boardId: string;
      }>
    ) => {
      state.curriculum = action.payload.curriculum;
      state.grade = action.payload.grade;
      state.gradeName = action.payload.gradeName;
      state.subject = action.payload.subject;
      state.subjectName = action.payload.subjectName;
      state.numberOfQuestions = action.payload.numberOfQuestions;
      state.stateBoardState = action.payload.stateBoardState;
      state.boardId = action.payload.boardId;
    },
    setNumberOfQuestions: (state, action: PayloadAction<string>) => {
      state.numberOfQuestions = action.payload;
    },
    setGrade: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.grade = action.payload.id;
      state.gradeName = action.payload.name;
    },
    setSubject: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.subject = action.payload.id;
      state.subjectName = action.payload.name;
    },
    setStateBoardState: (state, action: PayloadAction<string>) => {
      state.stateBoardState = action.payload;
    },
    setBoardId: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
    setFiles: (state, action: PayloadAction<FileMeta[]>) => {
      state.files = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setField: (state, action: PayloadAction<{ key: keyof WorksheetState, value: any }>) => {
      (state[action.payload.key] as typeof action.payload.value) = action.payload.value;
    },
    setCustomizations: (state, action: PayloadAction<string[]>) => {
      state.customizations = action.payload;
    },
    setQuestionTypes: (state, action: PayloadAction<string[]>) => {
      state.questionTypes = action.payload;
    },
    setQuestionCategory: (state, action: PayloadAction<string>) => {
      state.questionCategory = action.payload;
    },
    setAdditionalFeatures: (state, action: PayloadAction<string[]>) => {
      state.additionalFeatures = action.payload;
    },
    setDifficultyLevel: (state, action: PayloadAction<'Easy' | 'Medium' | 'Hard'>) => {
      state.difficultyLevel = action.payload;
    },
    setGeneratedContent: (
      state,
      action: PayloadAction<{ questionText: string; aiResponse: string; worksheetId?: string; uploadedFiles?: any[] }>
    ) => {
      state.questionText = action.payload.questionText;
      state.aiResponse = action.payload.aiResponse;
      if (action.payload.worksheetId) {
        state.worksheetId = action.payload.worksheetId;
      }
      if (action.payload.uploadedFiles) {
        state.uploadedFiles = action.payload.uploadedFiles;
      }
    },
  },
});

export const {
  setInputMethod,
  setCurriculumData,
  setGrade,
  setSubject,
  setNumberOfQuestions,
  setStateBoardState,
  setBoardId,
  setFiles,
  setTopic,
  setCustomizations,
  setQuestionTypes,
  setQuestionCategory,
  setAdditionalFeatures,
  setDifficultyLevel, // ✅ Export
  setField,
  setGeneratedContent,
} = worksheetSlice.actions;

export default worksheetSlice.reducer;
