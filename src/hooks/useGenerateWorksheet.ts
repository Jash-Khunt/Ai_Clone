import { useState } from "react";
import api from "../utils/api";
import { UploadFile, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  setCustomizations,
  setGeneratedContent,
} from "../store/slices/worksheetSlice";
import { getCurrentUser } from "../utils/auth";

interface WorksheetParams {
  worksheet: {
    inputMethod?: string;
    curriculum?: string;
    boardId?: number;
    grade?: number;
    gradeName?: string;
    subject?: string;
    subjectName?: string;
    numberOfQuestions?: number;
    topic?: string;
    stateBoardState?: string;
    questionCategory?: string;
    additionalFeatures?: string[];
    difficultyLevel?: string;
    files?: (UploadFile & {
      galleryFile?: boolean;
      galleryId?: string;
      filePath?: string;
      name?: string;
      type?: string;
    })[];
  };
  selectedOptions: string[];
}

export const useGenerateWorksheet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const worksheet = useSelector((state: RootState) => state.worksheet);

  const generateWorksheet = async ({
    worksheet,
    selectedOptions,
  }: WorksheetParams) => {
    const user = getCurrentUser();

    if (!user?.user_id) {
      console.error("User not authenticated:", user);
      message.error("User not logged in");
      return;
    }

    console.log("Generating worksheet with data:", {
      userId: user.user_id,
      inputMethod: worksheet.inputMethod,
      curriculum: worksheet.curriculum,
      boardId: worksheet.boardId,
      grade: worksheet.grade,
      subject: worksheet.subject,
      numberOfQuestions: worksheet.numberOfQuestions,
      difficultyLevel: worksheet.difficultyLevel,
      selectedOptions,
    });

    const formData = new FormData();
    // Append all worksheet data with safe string conversion
    Object.entries({
      userId: String(user.user_id),
      inputMethod: worksheet.inputMethod || "",
      curriculum: worksheet.curriculum || "",
      boardId: worksheet.boardId ? String(worksheet.boardId) : "",
      grade_Id: worksheet.grade ? String(worksheet.grade) : "",
      gradeName: worksheet.gradeName || "",
      subject: worksheet.subject || "",
      subjectName: worksheet.subjectName || "",
      numberOfQuestions: worksheet.numberOfQuestions
        ? String(worksheet.numberOfQuestions)
        : "",
      topic: worksheet.topic || "",
      stateBoardState: worksheet.stateBoardState || "",
      questionTypes: JSON.stringify(selectedOptions),
      questionCategory: worksheet.questionCategory || "",
      additionalFeatures: JSON.stringify(worksheet.additionalFeatures || []),
      difficultyLevel: worksheet.difficultyLevel || "Medium", // Default to Medium if empty
    }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (worksheet.files && worksheet.files.length > 0) {
      const galleryFiles = [];

      for (const file of worksheet.files) {
        const origin = (file as UploadFile)?.originFileObj;

        if (origin instanceof File) {
          formData.append("files", origin);
        } else if (file.galleryFile) {
          // Handle gallery files
          const galleryFileData = {
            id: file.galleryId,
            name: file.name,
            type: file.type,
            filePath: file.filePath,
            galleryFile: true,
            galleryId: file.galleryId,
          };
          console.log("📁 Gallery file data being sent:", galleryFileData);
          galleryFiles.push(galleryFileData);
        }
      }

      // Add gallery files to form data
      if (galleryFiles.length > 0) {
        formData.append("galleryFiles", JSON.stringify(galleryFiles));
      }
    }

    try {
      setSubmitting(true);
      const response = await api.post("/generate-worksheet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization header will be added by your interceptor
        },
      });
      console.log("📩 API response:", response.data);

      if (response.data?.success) {
        const { aiResponse, questionText, worksheetId, uploadedFiles } =
          response.data.data;

        dispatch(setCustomizations(selectedOptions));
        dispatch(
          setGeneratedContent({
            aiResponse,
            questionText,
            worksheetId,
            uploadedFiles: uploadedFiles || [],
          })
        );

        navigate("/generated-worksheet");
      } else {
        message.error(response.data?.message || "Failed to generate worksheet");
      }
    } catch (err: any) {
      console.error("Worksheet generation error:", err);

      // Provide more specific error messages
      if (err.response) {
        // Server responded with error status
        const errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          "Server error occurred";
        message.error(`Failed to generate worksheet: ${errorMessage}`);
      } else if (err.request) {
        // Network error
        message.error(
          "Network error. Please check your connection and try again."
        );
      } else {
        // Other error
        message.error("Failed to generate worksheet. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { generateWorksheet, submitting };
};
