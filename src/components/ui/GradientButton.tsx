import React from 'react';
import { theme } from '../../styles/theme'

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        background: theme.gradients.blue600ToGreen600,
        color: theme.colors.white,
        border: 'none',
        padding: `${theme.spacing.md} ${theme.spacing['2xl']}`,
        borderRadius: theme.borderRadius.lg,
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        cursor: 'pointer',
        transition: theme.transitions.shadow,
        boxShadow: theme.shadows.md,
      }}
    >
      {children}
    </button>
  );
};

export default GradientButton;
