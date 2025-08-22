import { isValidPhoneNumber } from 'libphonenumber-js';

export interface CountryCodeOption {
  value: string;
  label: string;
  iso: string;
}

export const countryCodes: CountryCodeOption[] = [
  { value: '+91', label: '🇮🇳 +91', iso: 'IN' },
  { value: '+1', label: '🇺🇸 +1', iso: 'US' },
  { value: '+44', label: '🇬🇧 +44', iso: 'GB' },
  { value: '+971', label: '🇦🇪 +971', iso: 'AE' },
  { value: '+65', label: '🇸🇬 +65', iso: 'SG' },
  { value: '+61', label: '🇦🇺 +61', iso: 'AU' },
  { value: '+81', label: '🇯🇵 +81', iso: 'JP' },
];

export function validatePhone(countryCode: string, mobile: string): boolean {
  const selectedCountry = countryCodes.find(c => c.value === countryCode);
  return !!mobile && isValidPhoneNumber(`${countryCode}${mobile}`, selectedCountry?.iso);
}
