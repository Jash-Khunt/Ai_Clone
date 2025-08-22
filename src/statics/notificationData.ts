export interface Preferences {
  email: boolean;
  download: boolean;
  weekly: boolean;
  marketing: boolean;
}

export const defaultPreferences: Preferences = {
  email: true,
  download: true,
  weekly: false,
  marketing: false,
};

export const notificationPreferences = [
  {
    key: 'emailNotifications',
    title: 'Email Notifications',
    description: 'Receive updates about your worksheets and platform news',
    enabled: true,
  },
  {
    key: 'downloadNotifications',
    title: 'Download Notifications',
    description: 'Get notified when someone downloads your worksheets',
    enabled: true,
  },
  {
    key: 'weeklySummary',
    title: 'Weekly Summary',
    description: 'Receive a weekly summary of your activity and stats',
    enabled: false,
  },
  {
    key: 'marketingEmails',
    title: 'Marketing Emails',
    description: 'Receive promotional emails and feature announcements',
    enabled: false,
  },
];
