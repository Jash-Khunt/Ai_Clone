export type CurriculumOption = { label: string; value: string };
export type GradeOption = { label: string; value: string };
export type SubjectOption = { label: string; value: string };

export type QuestionTypeOption = string;
export type AddonOption = string;

export interface CurriculumGradeForm {
  curriculum: string;
  grade: string;
  subject: string;
}

export interface WorksheetFormData {
  inputMethod: 'upload' | 'type';
  curriculumInfo: CurriculumGradeForm;
  questionTypes: QuestionTypeOption[];
  addOns: AddonOption[];
}
