import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Typography } from 'antd';
import { countryCodes, validatePhone } from '../utils/validatePhoneNumber';
import styles from '../styles/custom/registraionPage.module.less';
import { GoogleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ExistingUserForm: React.FC<{ 
  onFinish: (values: any) => void,
  loginWithGoogle?: () => void
}> = ({ onFinish, loginWithGoogle }) => {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState('+91');
  const mobile = Form.useWatch('mobile', form);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validatePhone(countryCode, mobile));
  }, [countryCode, mobile]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        // ✅ only send trimmed mobile + country code
        onFinish({
          mobile: `${countryCode}${values.mobile}`,
          countryCode,
          rawMobile: values.mobile
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
            validator: (_, value) => {
              if (!value) return Promise.reject('Please enter your mobile number');
              return validatePhone(countryCode, value)
                ? Promise.resolve()
                : Promise.reject('Invalid phone number for selected country');
            }
          }
        ]}
      >
        <Input
          addonBefore={
            <Select
              value={countryCode}
              onChange={setCountryCode}
              options={countryCodes.map(c => ({ value: c.value, label: c.label }))}
              style={{ width: 100 }}
            />
          }
          placeholder="Enter your mobile number"
        />
      </Form.Item>

      <div className={styles.infoBox}>
        Enter your registered mobile number to receive a <Text strong>4-digit OTP</Text> and access your account.
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={!isValid}
          className={styles.submitButton}
        >
          Send Login OTP →
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExistingUserForm;
