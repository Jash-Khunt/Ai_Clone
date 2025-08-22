const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface FileItem {
  id: string;
  name: string;
  type: 'IMAGE' | 'PDF';
  uploadedAt: string;
  status: 'Used' | 'New';
  thumbnail?: string;
  size?: number;
  url?: string;
}

class FileService {
  // Get all files
  async getFiles(): Promise<FileItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/files`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  }

  // View file (get preview URL)
  async getFilePreview(fileId: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}/preview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to get file preview');
      }
      
      const data = await response.json();
      return data.previewUrl;
    } catch (error) {
      console.error('Error getting file preview:', error);
      throw error;
    }
  }

  // Download file
  async downloadFile(fileId: string, fileName: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/download/${fileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  // Delete file
  async deleteFile(fileId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Upload file
  async uploadFile(file: File): Promise<FileItem> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/files/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

export default new FileService(); 