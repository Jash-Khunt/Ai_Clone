import type React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WorksheetHeader from "../../components/WorksheetHeader";
import WorksheetSidebar from "../../components/WorksheetSidebar";
import WorksheetContent from "../../components/WorksheetContent";
import FolderSelectionModal from "../../components/FolderSelectionModal";
import styles from "../../styles/generatedWorksheet.module.less";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { message } from "antd";
import api from "../../utils/api";
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
  const worksheetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [hasAutoSaved, setHasAutoSaved] = useState(false);

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

  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.user_id);
    }

    if (storeUploadedFiles && storeUploadedFiles.length > 0) {
      setUploadedFiles(storeUploadedFiles);
    }
  }, [storeUploadedFiles]);

  useEffect(() => {
    if (uploadedFiles.length > 0 && userId && !hasAutoSaved) {
      saveFilesToMSLCFolder();
      setHasAutoSaved(true);
    }
  }, [uploadedFiles, userId]);

  const saveFilesToMSLCFolder = async () => {
    try {
      let folderId: number | null = await getOrCreateMSLCFolder(userId!);

      if (!folderId) {
        message.error("Failed to find or create MSLC folder");
        return;
      }

      const response = await fetch(`${API_URL}/gallery/save-files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: uploadedFiles,
          folder_id: folderId,
        }),
      });

      if (response.ok) {
        message.success("Files saved to MSLC folder in your gallery!");
        // Optionally navigate
        // navigate("/my-gallery");
      } else {
        message.error("Failed to save files to gallery");
      }
    } catch (error) {
      console.error("Error saving to MSLC folder:", error);
      message.error("Unexpected error while saving files");
    }
  };

  const getOrCreateMSLCFolder = async (
    userId: number
  ): Promise<number | null> => {
    try {
      // 1. Check existing folders
      const foldersRes = await fetch(
        `${API_URL}/gallery/user-folders?userId=${userId}`
      );
      if (!foldersRes.ok) throw new Error("Failed to fetch folders");
      const folders = await foldersRes.json();

      const existing = folders.find((f: any) => f.name === "MSLC");
      if (existing) return existing.folder_id;

      // 2. If not found, create one
      const createRes = await fetch(`${API_URL}/gallery/folders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "MSLC",
          parent_id: null,
          created_by: userId,
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create MSLC folder");
      const newFolder = await createRes.json();
      return newFolder.folder_id;
    } catch (error) {
      console.error("Error getting/creating MSLC folder:", error);
      return null;
    }
  };

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
    let isInMatchSection = false;
    let matchOptions: string[] = [];

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
      if (line.toUpperCase().startsWith("ANSWER KEY")) {
        // Skip answer key section
        while (i < lines.length && !lines[i].trim().startsWith("SECTION")) {
          i++;
        }
        continue;
      }

      // Handle Hindi section names
      if (line.startsWith("SECTION") || line.includes(":")) {
        const sectionText = line.split(":")[1]?.trim() || line;

        // Check for Hindi section names
        if (
          sectionText.includes("बहुविकल्पीय") ||
          sectionText.includes("Multiple Choice")
        ) {
          currentSection = "MCQ";
          isInMatchSection = false;
        } else if (
          sectionText.includes("रिक्त स्थान") ||
          sectionText.includes("Fill in the Blanks")
        ) {
          currentSection = "FILL";
          isInMatchSection = false;
        } else if (
          sectionText.includes("सही या गलत") ||
          sectionText.includes("True or False")
        ) {
          currentSection = "TRUE";
          isInMatchSection = false;
        } else if (
          sectionText.includes("मिलान") ||
          sectionText.includes("Match the Following")
        ) {
          currentSection = "MATCH";
          isInMatchSection = true;
          matchOptions = [];
        } else if (
          sectionText.includes("एक शब्द") ||
          sectionText.includes("One-word Answer")
        ) {
          currentSection = "SHORT";
          isInMatchSection = false;
        } else if (sectionText.includes("BONUS")) {
          currentSection = "BONUS";
          isInMatchSection = false;
        } else if (sectionText.includes("BRAIN")) {
          currentSection = "BRAIN";
          isInMatchSection = false;
        } else {
          currentSection = sectionText.toUpperCase();
          isInMatchSection = false;
        }
        continue;
      }

      const questionMatch = line.match(/^(\d+)\.(.*)/);
      if (questionMatch) {
        if (currentQuestion) {
          // For match questions, add all collected options
          if (isInMatchSection && matchOptions.length > 0) {
            currentQuestion.options = [...matchOptions];
            matchOptions = [];
          }
          questions.push(currentQuestion as Question);
        }

        const id = parseInt(questionMatch[1]);
        const questionText = questionMatch[2].trim();

        let questionType: Question["type"] = "Short Answer";

        // Determine question type based on current section
        if (
          currentSection.includes("MCQ") ||
          currentSection.includes("MULTIPLE")
        ) {
          questionType = "Multiple Choice";
        } else if (
          currentSection.includes("FILL") ||
          currentSection.includes("BLANKS")
        ) {
          questionType = "Fill in the Blanks";
        } else if (
          currentSection.includes("TRUE") ||
          currentSection.includes("FALSE")
        ) {
          questionType = "True/False";
        } else if (currentSection.includes("MATCH")) {
          questionType = "Short Answer";
        } else if (
          currentSection.includes("SHORT") ||
          currentSection.includes("ONE-WORD")
        ) {
          questionType = "Short Answer";
        } else if (currentSection.includes("BONUS")) {
          questionType = "Bonus Question";
        } else if (currentSection.includes("BRAIN")) {
          questionType = "Brain Teaser";
        } else if (currentSection.includes("ANSWER KEY")) {
          questionType = "Answer Key";
        }

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

      // Handle match the following questions - collect options
      if (isInMatchSection && currentQuestion) {
        // Match lines like "a. Hear" or "a. Hear _______"
        const matchOptionMatch = line.match(/^([a-e])\.\s*(.*?)\s*_*$/i);
        if (matchOptionMatch) {
          const optionText = `${
            matchOptionMatch[1]
          }. ${matchOptionMatch[2].trim()}`;
          matchOptions.push(optionText);
        }
        // Also handle lines that are just the option text (like "Eye", "Ear", etc.)
        else if (line.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
          matchOptions.push(line);
        }
      }
    }

    if (currentQuestion) {
      // For match questions, add all collected options
      if (isInMatchSection && matchOptions.length > 0) {
        currentQuestion.options = [...matchOptions];
      }
      questions.push(currentQuestion as Question);
    }

    return { title: worksheetTitle, questions, bonusContent };
  };

  const downloadWorksheet = async () => {
    if (!worksheetRef.current) {
      console.error("No worksheet content found");
      return;
    }

    const element = worksheetRef.current.cloneNode(true) as HTMLElement;
    element.style.fontSize = "12px";

    try {
      const opt = {
        margin: 0.5,
        filename: `${subject || "worksheet"}_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`,
        html2canvas: {
          scale: 2,
          logging: true,
          allowTaint: true,
          useCORS: true,
          scrollY: 0,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // <-- Add this line
      };

      console.log("Generating PDF...");
      await html2pdf().set(opt).from(element).save();
      console.log("PDF downloaded successfully");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  };
   const sendOnWhatsApp = async () => {
     if (!worksheetRef.current) {
       message.error("No worksheet content to export");
       return;
     }

     const element = worksheetRef.current.cloneNode(true) as HTMLElement;
     const oldFontSize = element.style.fontSize;
     element.style.fontSize = "12px";

     try {
       const opt = {
         margin: 0.5,
         filename: "file.pdf",
         html2canvas: { scale: 2 },
         jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
       };

       // Generate blob
       const blob = await html2pdf().from(element).set(opt).outputPdf("blob");

       // Prepare formData
       const formData = new FormData();
       formData.append(
         "file",
         blob,
         grade && subject
           ? `${grade.replace(/ /g, "_")}_${subject.replace(
               / /g,
               "_"
             )}_worksheet.pdf`
           : "worksheet.pdf"
       );

       const response = await api.post(
         "/generate-worksheet/upload-pdf",
         formData,
         {
           headers: { "Content-Type": "multipart/form-data" },
         }
       );

       const messageText = `Here's your file: ${response.data.fileUrl}`;
       const encoded = encodeURIComponent(messageText);
       window.open(`https://wa.me/?text=${encoded}`, "_blank");
     } catch (err) {
       console.error("WhatsApp send failed:", err);
       message.error("Failed to upload or share on WhatsApp");
     } finally {
       element.style.fontSize = oldFontSize;
     }
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

  return (
    <div className={styles.generatedWorksheetLayout}>
      <WorksheetHeader onBackClick={() => navigate("/worksheet-generator")} />
      <div className={styles.mainLayout}>
        <div className={styles.sidebarContainer}>
          <WorksheetSidebar
            worksheetInfo={worksheetInfo}
            onDownloadPDF={downloadWorksheet}
            onShowAnswers={() => console.log("Show Answers clicked")}
            onShareWorksheet={sendOnWhatsApp} 
            onRegenerate={() => console.log("Regenerate clicked")}
          />
        </div>

        <div className={styles.contentContainer} ref={worksheetRef}>
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
        onCancel={() => setShowFolderModal(false)}
        onConfirm={() => {}}
        uploadedFiles={uploadedFiles}
        userId={userId || 0}
      />
    </div>
  );
};

export default GeneratedWorkSheet;
