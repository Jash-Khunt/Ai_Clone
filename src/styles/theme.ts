// src/theme.ts

export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1280px',
};

export const colors = {
  // Backgrounds
  background: '#F9FAFB',         // bg-gray-50
  heroBackground: '#EFF6FF',     // bg-blue-100
  cardBackground: '#FFFFFF',     // bg-white
  pageBackground: '#F1F5F9',     // bg-slate-100

  // Text Colors
  textPrimary: '#1F2937',        // text-gray-800
  textSecondary: '#4B5563',      // text-gray-600
  textMuted: '#6B7280',          // text-gray-500
  textBlue: '#1E40AF',           // text-blue-800
  textBlueHover: '#1D4ED8',      // text-blue-700
  textBlue100: '#DBEAFE',        // text-blue-100
  textLight: '#FFFFFF',

  // Buttons
  buttonBg: '#2563EB',           // bg-blue-600
  buttonHoverBg: '#1D4ED8',      // bg-blue-700
  buttonDisabledBg: '#93C5FD',   // bg-blue-300
  buttonText: '#FFFFFF',

  //login and register background
  gray100: '#F3F4F6',

  // Borders
  border: '#E5E7EB',             // border-gray-200
  borderDark: '#D1D5DB',         // border-gray-300

  // Accents / Highlights
  primaryBlue: '#3B82F6',        // blue-500
  darkBlue: '#1E3A8A',           // blue-900
  lightBlue: '#60A5FA',          // blue-400
  lightBlue2: '#93C5FD',         // blue-300

  // Status Colors
  success: '#22C55E',            // green-500
  warning: '#FACC15',            // yellow-400
  error: '#EF4444',              // red-500
  info: '#0EA5E9',               // sky-500

  //Footer
  gray900: '#111827',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
};

export const typography = {
  fontFamily: `"Inter", "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    base: 1.6,
    relaxed: 1.75,
    tight: 1.25,
    text: 2.25,
  },
};

export const spacing = {
  xs: '0.5rem',     // 8px
  sm: '0.75rem',    // 12px
  base: '1rem',     // 16px
  md: '1.25rem',    // 20px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '4rem',    // 64px
};

export const borderRadius = {
  sm: '0.25rem',    // 4px
  base: '0.375rem', // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  full: '9999px',   // badges, pills
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',     // shadow-md
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',   // shadow-lg
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-xl
};

export const transitions = {
  shadow: 'box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  all: 'all 0.3s ease-in-out',
};

export const gradients = {
  blue600ToGreen600: 'linear-gradient(to right, #2563EB, #16A34A)', // Tailwind: from-blue-600 to-green-600
  blue50ToGreen50ViaWhite: 'linear-gradient(to bottom right, #EFF6FF, #FFFFFF, #F0FDF4)',
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  BREAKPOINTS,
  shadows,
  transitions,
  gradients
};
