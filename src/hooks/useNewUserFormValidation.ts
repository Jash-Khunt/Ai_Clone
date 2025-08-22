import { useEffect, useState } from 'react';
import { isValidMobile, isValidName, isValidEmail } from '../utils/validation';

export function useNewUserFormValidation(values: {
  mobile?: string;
  name?: string;
  email?: string;
  role?: string;
  terms?: boolean;
}) {
  const { mobile, name, email, role, terms } = values;
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    return setIsValid(
      !!(
        mobile &&
        isValidMobile(mobile) &&
        name &&
        isValidName(name) &&
        email &&
        isValidEmail(email) &&
        role &&
        terms
      )
    );
  }, [mobile, name, email, role, terms]);

  return isValid;
}
