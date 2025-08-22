import { useEffect, useState } from 'react';
import { validatePhone } from '../utils/validatePhoneNumber'

export function usePhoneValidation(countryCode: string, mobile: string) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validatePhone(countryCode, mobile));
  }, [countryCode, mobile]);

  return isValid;
}
