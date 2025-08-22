import React, { useRef, useEffect } from 'react';
import { Form, Input, Typography, Row, Col, Layout } from 'antd';
import CustomButton from './CustomButton';
import { useContactForm } from '../hooks/useContactForm';
import { handleContactFormSubmit } from '../utils/contactFormHandler';
import styles from '../styles/custom/contactForm.module.less';

const { Title } = Typography;
const { Content } = Layout;

const ContactForm: React.FC = () => {
  const { form, formTouched, setFormTouched } = useContactForm();
  const formRef = useRef<HTMLDivElement>(null);

  const onFinish = (values: any) => {
    handleContactFormSubmit(values, form.resetFields);
    setFormTouched(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFormTouched(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setFormTouched]);

  return (
    <Content className={styles.contactFormContent}>
      <div
        ref={formRef}
        className={`${styles.contactFormContainer} ${formTouched ? styles.focused : ''}`}
      >
        <Row>
          <Title level={2}>
            Send us a Message
          </Title>
        </Row>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFieldsChange={() => setFormTouched(true)}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Enter a valid email address' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea rows={5} placeholder="Type your message..." />
          </Form.Item>

          <Form.Item>
            <CustomButton
              text="Send Message"
              htmlType="submit"
              block
              size="large"
              className={styles.customButtonPrimary}
            />
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default ContactForm;
