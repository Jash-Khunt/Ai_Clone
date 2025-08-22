import { useState } from 'react';
import { Form } from 'antd';

export function useContactForm() {
  const [form] = Form.useForm();
  const [formTouched, setFormTouched] = useState(false);

  return { form, formTouched, setFormTouched };
}
