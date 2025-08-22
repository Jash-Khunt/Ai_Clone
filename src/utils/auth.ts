export interface User {
  user_id: string;
  name: string;
  email: string;
  role: string;
  mobile?: string;
  country?: string;
  curriculum?: string;
  grade_level?: string;
  language_preferences?: any;
  subjects?: any;
}

export const getCurrentUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    
    const user = JSON.parse(storedUser);
    
    // Check for different possible user ID field names
    const userId = user?.user_id || user?.id || user?.userId;
    
    if (!userId) {
      console.error('User object missing user_id:', user);
      return null;
    }
    
    return {
      ...user,
      user_id: userId // Normalize to user_id
    };
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();
  
  return !!(token && user);
};

export const getUserId = (): string | null => {
  const user = getCurrentUser();
  return user?.user_id || null;
};
