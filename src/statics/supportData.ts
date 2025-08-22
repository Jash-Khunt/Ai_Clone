// src/statics/supportData.ts

export interface SupportItem {
  type: 'email' | 'whatsapp' | 'location';
  title: string;
  description: string[];
  bgClass: string;
}

export const supportData: SupportItem[] = [
  {
    type: 'email',
    title: 'Email',
    description: ['support@aiworksheetpro.com'],
    bgClass: 'support-bg-email contact',
  },
  {
    type: 'whatsapp',
    title: 'WhatsApp Support',
    description: ['+91 98765 43210'],
    bgClass: 'support-bg-whatsapp contact',
  },
  {
    type: 'location',
    title: 'Location',
    description: [
      'India: Surat, Gujarat',
      'UAE: Dubai Silicon Oasis',
      'USA: California, USA',
    ],
    bgClass: 'support-bg-location contact',
  }
];
