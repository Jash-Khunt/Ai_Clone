// LEGACY FILE - NO LONGER USED
// This file has been replaced by dynamic plan loading from the backend API
// Plans are now managed through the admin panel with display_on_landing functionality

export interface PlanFeature {
  tag?: string;
  title: string;
  price: Record<string, string>;
  worksheets: string;
  buttonLabel: string;
  highlight?: boolean;
  features: {
    label: string;
    included: boolean;
  }[];
}

// Static plan data kept for reference only - not used in production
export const planFeatures: PlanFeature[] = [];
