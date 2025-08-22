import { useDispatch, useSelector } from 'react-redux';
import { setFiles } from '../store/slices/worksheetSlice';
import { RootState } from '../store';
import { UploadFile } from 'antd/es/upload/interface';
import { message } from 'antd';
import { useState } from 'react';

export interface FileMeta {
  uid: string;
  name: string;
  type: string;
  url: string;
  originFileObj: File;
  status: 'done' | 'uploading' | 'error' | 'removed';
}

export const useFileUploadHandler = () => {
  const dispatch = useDispatch();
  const fileList = useSelector((state: RootState) => state.worksheet.files) as FileMeta[];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (info: { file: UploadFile; fileList: UploadFile[] }) => {
    const incomingFiles: FileMeta[] = [];

    if (fileList.length >= 5) {
      setErrorMessage('Maximum file limit reached. You can only upload 5 files.');
      message.error('You can only upload a maximum of 5 files.');
      return;
    }

    for (const f of info.fileList) {
      const fileObj = f.originFileObj;
      if (!fileObj) continue;

      const alreadyExists = fileList.find(existing => existing.name === fileObj.name);
      if (alreadyExists) continue;

      const fileMeta: FileMeta = {
        uid: f.uid || `${Date.now()}-${fileObj.name}`,
        name: fileObj.name,
        type: fileObj.type || 'application/octet-stream',
        url: URL.createObjectURL(fileObj),
        originFileObj: fileObj,
        status: 'done',
      };

      incomingFiles.push(fileMeta);
    }

    const newList = [...fileList, ...incomingFiles];
    if (newList.length > 5) {
      setErrorMessage('Only the first 5 files are allowed. Extra files were ignored.');
      message.error('Only the first 5 files have been kept.');
    }

    dispatch(setFiles(newList.slice(0, 5)));
  };

  const handleRemove = (uid: string) => {
    const updatedList = fileList.filter(file => file.uid !== uid);
    dispatch(setFiles(updatedList));
    if (updatedList.length < 5) {
      setErrorMessage(null);
    }
  };

  return {
    fileList,
    handleFileChange,
    handleRemove,
    errorMessage, 
  };
};
