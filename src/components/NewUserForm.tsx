import React, { useState } from 'react';
import { Form, Input, Radio, Checkbox, Button, Typography, Select } from 'antd';
import { useNewUserFormValidation } from '../hooks/useNewUserFormValidation';
import { countryCodes, validatePhone } from '../utils/validatePhoneNumber';
import styles from '../styles/custom/registraionPage.module.less';
import { GoogleOutlined } from '@ant-design/icons';

const { Link } = Typography;

interface NewUserFormProps {
  onFinish?: (values: any) => void;
  loginWithGoogle?: () => void;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ onFinish, loginWithGoogle }) => {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState('+91');

  const mobile = Form.useWatch('mobile', form);
  const name = Form.useWatch('name', form);
  const email = Form.useWatch('email', form);
  const role = Form.useWatch('role', form);
  const terms = Form.useWatch('terms', form);

  const isValid = useNewUserFormValidation({ mobile, name, email, role, terms });

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ role: 'Parent', whatsapp: true }}
      onFinish={(values) => {
        // ✅ Always combine countryCode with mobile here
        onFinish?.({
          ...values,
          mobile: `${countryCode}${values.mobile}`
        });
      }}
    >
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Button icon={<GoogleOutlined />} onClick={loginWithGoogle} style={{ width: '100%', marginBottom: '1rem' }}>
          Continue with Google
        </Button>
        <hr style={{ marginBottom: '1rem' }} />
      </div>

      <Form.Item
        label={<strong>Mobile Number</strong>}
        name="mobile"
        rules={[
          { required: true, message: 'Please enter your mobile number' },
          {
            validator: (_, value) =>
              !value || validatePhone(countryCode, value)
                ? Promise.resolve()
                : Promise.reject('Invalid phone number for selected country'),
          },
        ]}
      >
        <Input
          addonBefore={
            <Select
              value={countryCode}
              onChange={setCountryCode}
              options={countryCodes.map(c => ({
                value: c.value,
                label: c.label,
              }))}
              style={{ width: 100 }}
            />
          }
          placeholder="Enter your mobile number"
        />
      </Form.Item>

      <Form.Item
        label={<strong>Name</strong>}
        name="name"
        rules={[
          { required: true, message: 'Please enter your name' },
          { pattern: /^[a-zA-Z\s]{2,}$/, message: 'Minimum 2 characters, letters only' },
        ]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label={<strong>Email Address</strong>}
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Enter a valid email address' },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label={<strong>I am a</strong>}
        name="role"
        rules={[{ required: true, message: 'Please select one' }]}
      >
        <Radio.Group>
          <Radio value="Parent">Parent</Radio>
          <Radio value="Student">Student</Radio>
          <Radio value="Educator">Educator</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="terms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')),
          },
        ]}
      >
        <Checkbox>
          By proceeding, you agree to our <Link href="#">Terms and Conditions</Link>
        </Checkbox>
      </Form.Item>

      <Form.Item name="whatsapp" valuePropName="checked">
        <Checkbox>
          Get updates on features, tips, and announcements via WhatsApp.
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={!isValid}
          className={styles.submitButton}
        >
          Request OTP →
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewUserForm;
