export const getCountryCode = (): string => {
  return localStorage.getItem('countryCode') || 'IN';
};
