export const isValidMobile = (mobile: string): boolean => /^[6-9]\d{9}$/.test(mobile);

export const isValidName = (name: string): boolean => /^[a-zA-Z\s]{2,}$/.test(name);

export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);