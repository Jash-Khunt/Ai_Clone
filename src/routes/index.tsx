import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import AboutPage from '../pages/AboutPage';
import Verification from '../pages/Verification/Verification';
import VerificationSuccess from '../pages/Verification/VerificationSuccess';
import InputType from '../pages/GenerateWorksheet/InputType';
import Grade from '../pages/GenerateWorksheet/Grade';
import Content from '../pages/GenerateWorksheet/Content';
import Customize from '../pages/GenerateWorksheet/Customize';
import GeneratedWorkSheet from '../pages/GeneratedWorkSheet/GeneratedWorkSheet';
import DemoVideo from '../pages/DemoWorkSheet/DemoVideo';
import Input from '../pages/DemoWorkSheet/Input';
import ContentFile from '../pages/DemoWorkSheet/ContentFile';
import Configure from '../pages/DemoWorkSheet/Configure';
import CustomizeSheet from '../pages/DemoWorkSheet/CustomizeSheet';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/ProfilePage';
import CBSEWorksheets from '../pages/CBSEWorksheets/CBSEWorksheets';
import RegisterDemoFlow from '../components/RegisterDemoForm';
import DemoPage from '../pages/DemoPage';
import WorksheetGenerator from '../pages/WorksheetGenerator';
import FeedbackForm from '../components/FeedbackForm';
import CreateWorksheet from '../pages/CreateWorksheet';
import ProtectedRoute from '../components/ProtectedRoute';
import Gallery from '../pages/MyGallery';
import AIWorksheetGenerator from '../pages/AIWorksheetGenerator';
import GenerateWorksheetPage from '../pages/GenerateWorksheetPage';
import NewDashboard from '../components/NewDashboard';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3QuestionConfiguration';
import NewWorksheetPage from '../pages/NewWorksheetPage';
import ContactForm from '../components/ContactForm';
import WorksheetSummary from '../components/WorksheetSummary';

const getBasename = () => {
  return import.meta.env.VITE_BASE_PATH || '/';
};

const AppRoutes = () => (
  <Router basename={getBasename()}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/register" element={<RegisterDemoFlow />} />
      {/* <Route path="/verification" element={<Verification />} />
      <Route path="/verificationSuccess" element={<VerificationSuccess />} /> */}

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <NewDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cbse-worksheets"
        element={
          <ProtectedRoute>
            <CBSEWorksheets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/demo-page"
        element={
          <ProtectedRoute>
            <DemoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo-video"
        element={
          <ProtectedRoute>
            <DemoVideo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo-input"
        element={
          <ProtectedRoute>
            <Input />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo-content"
        element={
          <ProtectedRoute>
            <ContentFile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo-configure"
        element={
          <ProtectedRoute>
            <Configure />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo-customize"
        element={
          <ProtectedRoute>
            <CustomizeSheet />
          </ProtectedRoute>
        }
      />
      <Route path="/worksheet" element={<ProtectedRoute><NewWorksheetPage /></ProtectedRoute>} />
      <Route path="/worksheet/step1" element={<ProtectedRoute><NewWorksheetPage /></ProtectedRoute>} />
      <Route path="/worksheet/step2" element={<ProtectedRoute><NewWorksheetPage /></ProtectedRoute>} />
      <Route path="/worksheet/step3" element={<ProtectedRoute><NewWorksheetPage /></ProtectedRoute>} />
      <Route path="/worksheet/step4" element={<ProtectedRoute><NewWorksheetPage /></ProtectedRoute>} />
      <Route path="/input" element={<ProtectedRoute><InputType /></ProtectedRoute>} />
      <Route path="/grade" element={<ProtectedRoute><Grade /></ProtectedRoute>} />
      <Route path="/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
      <Route path="/customize" element={<ProtectedRoute><Customize /></ProtectedRoute>} />
      <Route path="/worksheet-generator" element={<ProtectedRoute><WorksheetGenerator /></ProtectedRoute>} />
      <Route path="/generated-worksheet" element={<ProtectedRoute><WorksheetSummary /></ProtectedRoute>} />
      <Route path="/parent-worksheet" element={<ProtectedRoute><CreateWorksheet /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><FeedbackForm /></ProtectedRoute>} />
      <Route path="/my-gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
      <Route path="/ai-worksheet-generator" element={<ProtectedRoute><AIWorksheetGenerator /></ProtectedRoute>} />
      <Route path="/worksheet-gallery" element={<ProtectedRoute><GenerateWorksheetPage /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactForm /></ProtectedRoute>} />
    </Routes>
  </Router>
);

export default AppRoutes;
