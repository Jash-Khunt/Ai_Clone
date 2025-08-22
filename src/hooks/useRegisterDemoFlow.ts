import { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export function useRegisterDemoFlow() {
  const router = useNavigate();
  const [activeTab, setActiveTab] = useState('1');
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [formData, setFormData] = useState<any>({});
  const [signupResponse, setSignupResponse] = useState<any>({});
  const isNewUser = activeTab === '1';

  const handleFormFinish = async (values: any) => {
    try {
      const payload = {
        name: values.name || '', 
        mobile: values.mobile,
        email_id: values.email || '',
        role: values.role || '',
        whatsapp_updates: values.whatsapp ? 1 : 0
      };

      setMobile(payload.mobile);
      setFormData(payload);

      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = isNewUser
        ? `${apiUrl}/productUser/auth/signup`
        : `${apiUrl}/productUser/auth/signin`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      // protect against unexpected data
      if (!response.ok || !data.success) {
        message.error(data.message || "User already exist or Network Error");
        return;  
      }

      // otherwise proceed
      message.success(isNewUser ? 'OTP sent for registration.' : 'OTP sent for login.');
      setSignupResponse(data.data);
      setStep(2);
    } catch (err) {
      console.error(isNewUser ? 'Signup error:' : 'Signin error:', err);
      message.error('An error occurred. Please try again.');
    }
  };

  const handleOtpSuccess = (otpValue: string) => {
    if (isNewUser) {
      setStep(3);
    } else {
      router("/demo-page");
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else setStep(1);
  };

  const resetFlow = () => {
    setStep(1);
    setActiveTab('1');
    setFormData({});
    setMobile('');
  };

  return {
    activeTab,
    setActiveTab,
    step,
    setStep,
    mobile,
    isNewUser,
    formData,
    signupResponse,
    handleFormFinish,
    handleOtpSuccess,
    handleBack,
    resetFlow,
  };
}
