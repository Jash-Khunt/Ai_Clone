import { message } from "antd";
import api from "../utils/api";

export const handleContactFormSubmit = async (values: any, resetForm: any) => {
  try {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };

    const res = await api.post("/contact", payload);
    const data = res.data;

    if (data.success) {
      resetForm();
      message.success("Thank you! Your message has been sent.");
    } else {
      message.error("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Contact form error:", err);
    message.error("Server error.");
  }
};
