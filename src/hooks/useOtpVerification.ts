import { useState } from "react";
import api from "../utils/api";
import { message } from "antd";

export const useOtpVerification = (
  otpLength: number,
  onSuccess: () => void,
  userData: any,
  isNewUser: boolean
) => {
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""));
  const [loading, setLoading] = useState(false);

  const resetOtp = () => setOtp(new Array(otpLength).fill(""));

  const verifyOtp = async (overrideOtp?: string[]) => {
    const otpArray = overrideOtp ?? otp;

    if (otpArray.includes("")) {
      message.error("Please complete the OTP.");
      return;
    }

    const otpValue = otpArray.join("");
    setLoading(true);

    const payload = {
      otp: otpValue,
      name: userData.name,
      mobile: `${userData.countryCode || ""}${userData.mobile}`,
      email_id: userData.email_id,
      role: userData.role,
      whatsapp_updates: userData.whatsapp ? 1 : 0,
    };

    try {
      const endpoint = isNewUser
        ? `/productUser/auth/verify-otp`
        : `/productUser/auth/verify-signin-otp`;

      const response = await api.post(endpoint, payload);
      const result = response.data;

      console.log("✅ OTP verification result:", result);

      if (!result.token || !result.user) {
        throw new Error("Token or user data missing in response.");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      message.success(result.message || "OTP verified successfully!");
      onSuccess();
    } catch (err: any) {
      console.error(
        "==> ❌ OTP verification failed:",
        err?.response?.data || err
      );
      message.error(
        err?.response?.data?.message || "Invalid OTP. Please try again."
      );
      resetOtp();
    } finally {
      setLoading(false);
    }
  };

  return { otp, setOtp, loading, resetOtp, verifyOtp };
};
