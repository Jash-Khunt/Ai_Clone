export interface ProfileData {
  fullName: string,
  email: string,
  phone: string,
  school: string,
  address: string,
  bio: string,
  avatar: string,
  initials: string,
  role: 'Teacher' | 'Student' | 'Parent',
  worksheetsCreated:number,
  downloads: number,
  memberSince: string,
}

export const profileData = {
  fullName: 'Sarah Johnson',
  email: 'sarah.j@lincolnelem.edu',
  phone: '+1 (555) 123-4567',
  school: 'Lincoln Elementary School',
  address: '123 Education St, Learning City, LC 12345',
  bio: `Passionate 5th grade teacher with 8 years of experience in elementary education. 
I love creating engaging math and science worksheets that help students discover the joy of learning.`,
  avatar: '',
  initials: 'SJ',
  role: 'Teacher',
  worksheetsCreated: 47,
  downloads: 1834,
  memberSince: 'September 2023',
};
