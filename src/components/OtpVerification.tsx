import React, { useRef, useEffect, useState } from 'react';
import { Button, Input, Typography, message } from 'antd';
import styles from '../styles/custom/registraionPage.module.less';
import { useCountdown } from '../hooks/useCountdown';
import { handleOtpChange, handleKeyDown, handlePasteOtp } from '../utils/otp';
import { useOtpVerification } from '../hooks/useOtpVerification';

const { Text } = Typography;

interface Props {
  mobile: string;
  onSuccess: (otp: string) => void;
  formData: any;
  otpLength: number;
  isNewUser: boolean;
}

const OtpVerification: React.FC<Props> = ({ mobile, onSuccess, formData, otpLength, isNewUser }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { timeLeft, reset } = useCountdown(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const { otp, setOtp, loading, resetOtp, verifyOtp } = useOtpVerification(otpLength, onSuccess, formData, isNewUser);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  // New wrapper for OTP change that triggers auto verification
  const handleOtpChangeWrapper = (value: string, index: number) => {
    handleOtpChange(value, index, otp, setOtp, inputRefs);

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    if (updatedOtp.every(digit => digit !== '')) {
      setTimeout(() => {
        verifyOtp(updatedOtp);
      }, 100);
    }

  };

  return (
    <div className={styles.otpContainer}>
      <Text>We have sent an OTP to</Text><br />
      <Text strong>{mobile}</Text>

      <div className={styles.otpInputs}>
        {otp.map((digit, index) => (
          <Input
            key={index}
            maxLength={1}
            value={digit}
            ref={(ref) => { inputRefs.current[index] = ref ? ref.input : null; }}
            onChange={(e) => handleOtpChangeWrapper(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index, otp, inputRefs)}
            onPaste={(e) => handlePasteOtp(e, otp, setOtp, inputRefs)}
            className={styles.otpInput}
            disabled={loading}
          />
        ))}
      </div>

      <div className={styles.timerText}>00:{String(timeLeft).padStart(2, '0')}</div>

      <Button
        type="primary"
        block
        onClick={() => verifyOtp()}
        disabled={otp.includes('') || loading}
        className={styles.submitButton}
        loading={loading}
      >
        Submit →
      </Button>

      <div className={styles.resendText}>
        <Text type="secondary">
          Didn’t get OTP code?{' '}
          <a
            onClick={() => {
              if (!isResendDisabled) {
                reset(60);
                resetOtp();
                setIsResendDisabled(true);
                message.info("New OTP sent to your mobile/email.");
              }
            }}
            style={{
              color: isResendDisabled ? '#999' : '#1890ff',
              pointerEvents: isResendDisabled ? 'none' : 'auto',
              cursor: isResendDisabled ? 'not-allowed' : 'pointer',
              textDecoration: isResendDisabled ? 'none' : 'underline'
            }}
          >
            Resend code
          </a>
        </Text>
      </div>
    </div>
  );
};

export default OtpVerification;
