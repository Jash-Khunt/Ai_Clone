import { message } from 'antd';

export function handleOtpChange(value: string, index: number, otp: string[], setOtp: (otp: string[]) => void, inputRefs: React.MutableRefObject<Array<HTMLInputElement | null>>) {
  if (/^\d?$/.test(value)) {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }
}

export function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number, otp: string[], inputRefs: React.MutableRefObject<Array<HTMLInputElement | null>>) {
  if (e.key === 'Backspace' && !otp[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
}

export const handlePasteOtp = (
  e: React.ClipboardEvent<HTMLInputElement>,
  otp: string[],
  setOtp: React.Dispatch<React.SetStateAction<string[]>>,
  inputRefs: React.MutableRefObject<Array<HTMLInputElement | null>>
) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData('Text').replace(/\D/g, '');
  if (!pastedData) return;

  const pastedDigits = pastedData.slice(0, 6).split('');
  const newOtp = Array(6).fill('');
  pastedDigits.forEach((digit, i) => {
    newOtp[i] = digit;
  });

  setOtp(newOtp);

  const lastIndex = pastedDigits.length - 1;
  if (inputRefs.current[lastIndex]) {
    inputRefs.current[lastIndex]?.focus();
  }
};

export const handleSubmitOtp = (
  otp: string[],
  onSuccess: (otp: string) => void
) => {
  const fullOtp = otp.join('');
  if (fullOtp.length === 6) {
    onSuccess(fullOtp);
  } else {
    message.error('Please enter a valid 6-digit OTP');
  }
};

export const handleResendOtp = async (
  isResendDisabled: boolean,
  setIsResendDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  reset: (newTime: number) => void,
  setOtp: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (isResendDisabled) return;
  setIsResendDisabled(true);
  setLoading(true);

  reset(60);
  setOtp(['', '', '', '', '', '']);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  message.success('OTP has been resent successfully. (Demo)');
  setLoading(false);
};
