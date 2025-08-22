import { useState, useEffect } from 'react';
import api from '../utils/api';

interface UseQuestionCategoriesProps {
  boardId?: string;
  gradeId?: string;
  subjectId?: string;
}

export const useQuestionCategories = ({ boardId, gradeId, subjectId }: UseQuestionCategoriesProps = {}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (boardId) params.append('boardId', boardId);
        if (gradeId) params.append('gradeId', gradeId);
        if (subjectId) params.append('subjectId', subjectId);

        console.log('🔍 Fetching question categories with params:', params.toString());
        const response = await api.get(`/question-types/categories?${params.toString()}`);
        
        console.log('✅ Question categories response:', response.data);
        
        if (response.data?.success) {
          setCategories(response.data.data);
        } else {
          setError('Failed to fetch question categories');
        }
      } catch (err: any) {
        console.error('❌ Error fetching question categories:', err);
        console.error('❌ Error response:', err.response?.data);
        setError(`Failed to fetch question categories: ${err.response?.data?.error || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [boardId, gradeId, subjectId]);

  return { categories, loading, error };
};
