import {
  FileTextOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  BulbOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const statCards = [
  {
    title: 'Total Worksheets',
    current: 35,
    previous: 35,
    icon: FileTextOutlined,
    iconClass: 'icon0',
    type: 'growth' as const,
  },
  {
    title: 'Total Downloads',
    current: 1834,
    previous: 1640,
    icon: DownloadOutlined,
    iconClass: 'icon1',
    type: 'growth' as const,
  },
  {
    title: 'Daily Usage - Pro Plan',
    used: 23,
    total: 50,
    icon: ClockCircleOutlined,
    iconClass: 'icon2',
    type: 'usage' as const,
  },
];


export const quickActions = [
  {
    title: 'Generate from Image',
    description: 'Upload an image or PDF to create worksheets',
    icon: UploadOutlined,
    iconClass: 'icon0',
  },
  {
    title: 'Generate from Concept',
    description: 'Select concepts from our curated bank',
    icon: BulbOutlined,
    iconClass: 'icon1',
  },
  {
    title: 'Start from Scratch',
    description: 'Create custom worksheets with prompts',
    icon: EditOutlined,
    iconClass: 'icon2',
  },
];

export type WorksheetStatus = "published" | "draft";

export interface Worksheet {
  title: string;
  subject: string;
  grade: string;
  downloads: number;
  status: WorksheetStatus;
}

export const worksheets: Worksheet[] = [
  { title: 'Fractions and Decimals', subject: 'Mathematics', grade: '5th Grade', downloads: 24, status: 'published' },
  { title: 'Solar System Facts', subject: 'Science', grade: '4th Grade', downloads: 18, status: 'draft' },
  { title: 'Reading Comprehension', subject: 'English', grade: '3rd Grade', downloads: 35, status: 'published' },
  { title: 'American History Timeline', subject: 'Social Studies', grade: '8th Grade', downloads: 12, status: 'published' },
];

export const libraryCategories = [
  'All Categories',
  'Mathematics',
  'English',
  'Science',
  'Social Studies',
];

export interface LibraryItem {
  subject: string;
  title: string;
  description: string;
  downloads: number;
  rating: number;
}

export const libraryData: LibraryItem[] = [
  {
    subject: 'Mathematics',
    title: 'Mathematics Grade 5 Bundle',
    description: 'Complete set of math worksheets for 5th grade',
    downloads: 1240,
    rating: 4.8,
  },
  {
    subject: 'English',
    title: 'English Comprehension Pack',
    description: 'Reading comprehension worksheets grades 3–6',
    downloads: 890,
    rating: 4.7,
  },
  {
    subject: 'Science',
    title: 'Science Experiments Collection',
    description: 'Hands-on science worksheets and activities',
    downloads: 654,
    rating: 4.9,
  },
];

export interface AITool {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const aiTools: AITool[] = [
  {
    title: 'Story Generator',
    description: 'Enter topic → get age-wise moral story',
    icon: 'BookOutlined'
  },
  {
    title: 'Quiz Maker',
    description: 'Make quizzes from textbook chapter name',
    icon: 'AppstoreAddOutlined'
  },
  {
    title: 'Report Card Comment Maker',
    description: 'Auto-generate term report comments',
    icon: 'FileTextOutlined'
  },
  {
    title: 'Spelling Practice Sheet Generator',
    description: 'Create PDF spelling tests',
    icon: 'BulbOutlined'
  },
  {
    title: 'Homework Planner',
    description: 'Auto-generate 1-week plan for selected subjects',
    icon: 'ClockCircleOutlined'
  },
  {
    title: 'Parent-Teacher Note Generator',
    description: 'AI writes polite, clear updates to parents',
    icon: 'UserSwitchOutlined'
  },
  {
    title: 'Career Interest Quiz (for kids)',
    description: 'Helps teachers guide students',
    icon: 'SmileOutlined'
  },
  {
    title: 'Worksheet Personalizer',
    description: 'Adjust for special needs/difficulty level',
    icon: 'EditOutlined'
  },
  {
    title: 'Riddle & Puzzle Maker',
    description: 'Print-friendly, theme-based brain games',
    icon: 'QuestionCircleOutlined'
  },
  {
    title: 'Language Switcher',
    description: 'Auto-translate worksheet to Hindi/Gujarati/French etc.',
    icon: 'GlobalOutlined'
  },
];
