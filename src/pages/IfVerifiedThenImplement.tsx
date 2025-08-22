import type React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../store";
import WorksheetHeader from "../components/WorksheetHeader";
import WorksheetSidebar from "../components/WorksheetSidebar";
import WorksheetContent from "../components/WorksheetContent";
import FolderSelectionModal from "../components/FolderSelectionModal";
import styles from "../styles/generatedWorksheet.module.less";
import { useNavigate } from "react-router-dom";
import { message } from "antd";


interface Question {
  id: number;
  type:
    | "Multiple Choice"
    | "Fill in the Blanks"
    | "Short Answer"
    | "Answer Key"
    | "True/False"
    | "Word Problem"
    | "Bonus Question"
    | "Brain Teaser";
  question: string;
  options?: string[];
  instruction?: string;
}

const GeneratedWorkSheet: React.FC = () => {
  const navigate = useNavigate();
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  
  const {
    curriculum,
    grade,
    subject,
    topic,
    stateBoardState,
    aiResponse,
    customizations,
    numberOfQuestions,
    uploadedFiles: storeUploadedFiles,
  } = useSelector((state: RootState) => state.worksheet);

  const formattedCurriculum =
    curriculum === "state" ? `${stateBoardState} State Board` : curriculum;

  // Check for uploaded files and show modal
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.user_id);
    }

    // Check if there are uploaded files in the store
    if (storeUploadedFiles && storeUploadedFiles.length > 0) {
      setUploadedFiles(storeUploadedFiles);
      setShowFolderModal(true);
    }
  }, [storeUploadedFiles]);

  const parseWorksheetContent = (response: string) => {
    if (!response) return { title: "", questions: [], bonusContent: {} };

    const lines = response.split("\n").filter((line) => line.trim() !== "");
    let currentSection = "";
    const questions: Question[] = [];
    let worksheetTitle = "";
    let bonusContent = { funFact: "", realWorld: "" };

    if (lines.length > 0) {
      worksheetTitle = lines[0].replace("WORKSHEET ON", "").trim();
    }

    let currentQuestion: Partial<Question> | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.toUpperCase().startsWith("BONUS CONTENT") || !line) continue;
      if (line.toUpperCase().startsWith("FUN FACT:")) {
        bonusContent.funFact = line.replace("FUN FACT:", "").trim();
        continue;
      }
      if (line.toUpperCase().startsWith("REAL-WORLD APPLICATION:")) {
        bonusContent.realWorld = line
          .replace("REAL-WORLD APPLICATION:", "")
          .trim();
        continue;
      }

      if (line.startsWith("SECTION")) {
        currentSection = line.split(":")[1]?.trim().toUpperCase() || "";
        continue;
      }

      const questionMatch = line.match(/^(\d+)\.(.*)/);
      if (questionMatch) {
        if (currentQuestion) {
          questions.push(currentQuestion as Question);
        }

        const id = parseInt(questionMatch[1]);
        const questionText = questionMatch[2].trim();

        let questionType: Question["type"] = "Short Answer";
        if (currentSection.includes("MCQ")) questionType = "Multiple Choice";
        else if (currentSection.includes("FILL"))
          questionType = "Fill in the Blanks";
        else if (currentSection.includes("TRUE")) questionType = "True/False";
        else if (currentSection.includes("WORD")) questionType = "Word Problem";
        else if (currentSection.includes("BONUS"))
          questionType = "Bonus Question";
        else if (currentSection.includes("BRAIN"))
          questionType = "Brain Teaser";
        else if (currentSection.includes("ANSWER KEY"))
          questionType = "Answer Key";

        currentQuestion = {
          id,
          type: questionType,
          question: questionText,
          options: questionType === "Multiple Choice" ? [] : undefined,
        };
        continue;
      }

      if (currentQuestion?.type === "Multiple Choice") {
        const optionMatch =
          line.match(/^\(([a-d])\)(.*)/i) || line.match(/^([a-d])\.(.*)/i);
        if (optionMatch) {
          if (!currentQuestion.options) currentQuestion.options = [];
          currentQuestion.options.push(optionMatch[2].trim());
        }
      }
    }

    if (currentQuestion) {
      questions.push(currentQuestion as Question);
    }

    return { title: worksheetTitle, questions, bonusContent };
  };

  const { title, questions, bonusContent } = parseWorksheetContent(
    aiResponse || ""
  );

  const worksheetInfo = {
    topic: topic || title || "General Topic",
    curriculum: formattedCurriculum || "Curriculum",
    grade: grade || "Grade",
    subject: subject || "Subject",
    format: "A4",
    customizations: customizations.join(", ") || "None",
    numberOfQuestions: numberOfQuestions || "0",
  };

    const handleFolderConfirm = async (folderId: number | null) => {
    try {
      // Save files to gallery with selected folder
      if (uploadedFiles.length > 0) {
        const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
        
        const response = await fetch(`${API_URL}/gallery/save-files`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            files: uploadedFiles,
            folder_id: folderId
          }),
        });

        if (response.ok) {
          const result = await response.json();
          message.success('Files saved to gallery successfully!');
        } else {
          message.error('Failed to save files to gallery');
        }
      }
    } catch (error) {
      console.error('Error saving files to gallery:', error);
      message.error('Failed to save files to gallery');
    } finally {
      setShowFolderModal(false);
    }
  };

  return (
    <div className={styles.generatedWorksheetLayout}>
      <WorksheetHeader
        onBackClick={() => navigate("/worksheet-generator")}
      />
      <div className={styles.mainLayout}>
        <div className={styles.sidebarContainer}>
          <WorksheetSidebar
            worksheetInfo={worksheetInfo}
            onDownloadPDF={() => console.log("Download PDF clicked")}
            onShowAnswers={() => console.log("Show Answers clicked")}
            onShareWorksheet={() => console.log("Share Worksheet clicked")}
            onRegenerate={() => console.log("Regenerate clicked")}
          />
        </div>

        <div className={styles.contentContainer}>
          <WorksheetContent
            title={`${subject || "Subject"} Worksheet - ${worksheetInfo.topic}`}
            grade={grade || "Grade"}
            subject={subject || "Subject"}
            questions={questions}
            bonusContent={bonusContent}
          />
        </div>
      </div>

      <FolderSelectionModal
        visible={showFolderModal}
        onCancel={() => handleFolderConfirm(null)}
        onConfirm={handleFolderConfirm}
        uploadedFiles={uploadedFiles}
        userId={userId || 0}
      />
    </div>
  );
};

export default GeneratedWorkSheet;
