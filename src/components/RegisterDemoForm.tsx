import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  notification,
  Divider,
  Checkbox,
  Row,
  Col,
} from "antd";
import {
  ArrowLeftOutlined,
  GoogleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import styles from "../styles/custom/registraionPage.module.less";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../utils/api";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const RegisterDemoFlow: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        setGoogleEmail(res.data.email);
        try {
          const loginResponse = await api.post("/productUser/auth/signin", {
            email: res.data.email,
          });

          const { token, user } = loginResponse.data.data || {};
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
          }

          navigate("/demo-page");
          return;
        } catch (loginError) {
          form.setFieldsValue({
            username: res.data.given_name || "",
            email: res.data.email || "",
          });
          setIsModalVisible(true);
        }
      } catch (err) {
        console.error("Google login error", err);
        notification.error({
          message: t("registerPage.notifications.googleProfileError"),
        });
      }
    },
    onError: () =>
      notification.error({
        message: t("registerPage.notifications.googleLoginFailed"),
      }),
  });

  const handleRegister = async (values: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        email_id: googleEmail || values.email,
        mobile: values.mobile,
        name: values.username,
        role: values.role,
        whatsapp_updates: values.whatsapp_updates || false,
        ...(values.subjects && { subjects: values.subjects }),
        ...(values.curriculum && { curriculum: values.curriculum }),
        ...(values.gradeLevel && { gradeLevel: values.gradeLevel }),
        ...(values.country && { country: values.country }),
        ...(values.languagePreferences && {
          languagePreferences: values.languagePreferences,
        }),
      };

      const response = await api.post("/productUser/auth/signup", payload);

      const { token, user } = response.data.data || {};
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      notification.success({
        message: t("registerPage.notifications.registrationSuccess"),
        description: t("registerPage.notifications.registrationSuccessDesc"),
      });
      setIsModalVisible(false);
      navigate("/demo-page");
    } catch (error: any) {
      if (error.response?.data?.error?.includes("already exists")) {
        try {
          const loginResponse = await api.post("/productUser/auth/signin", {
            email: googleEmail || values.email,
          });

          const { token, user } = loginResponse.data.data || {};
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
          }

          notification.success({
            message: t("registerPage.notifications.loginSuccess"),
            description: t("registerPage.notifications.loginSuccessDesc"),
          });
          setIsModalVisible(false);
          navigate("/demo-page");
        } catch (loginError) {
          notification.error({
            message: t("registerPage.notifications.loginFailed"),
            description: t("registerPage.notifications.loginFailedDesc"),
          });
        }
      } else {
        notification.error({
          message: t("registerPage.notifications.registrationFailed"),
          description:
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Please try again later",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      form.setFieldsValue({ mobile: value });
    }
  };

  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationCard}>
        <div onClick={() => navigate("/")} className={styles.backLink}>
          <ArrowLeftOutlined style={{ marginRight: 8, fontSize: 16 }} />
          <span className={styles.backLinkText}>
            {t("registerPage.backToHome")}
          </span>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.iconCircle}>
            <MailOutlined className={styles.icon} />
          </div>
        </div>

        <h1 className={styles.heading}>{t("registerPage.joinTitle")}</h1>
        <p className={styles.subtitle}>{t("registerPage.subtitle")}</p>

        <Button
          className={styles.customButton}
          icon={<GoogleOutlined className={styles.googleIcon} />}
          onClick={() => login()}
        >
          {t("registerPage.continueGoogle")}
        </Button>

        <p className={styles.signInText}>
          {t("registerPage.alreadyHaveAccount")}{" "}
          <Button
            type="link"
            onClick={() => navigate("/login")}
            className={styles.signInLink}
          >
            {t("registerPage.signIn")}
          </Button>
        </p>

        <Modal
          title={
            googleEmail
              ? t("registerPage.modal.completeProfile")
              : t("registerPage.modal.createAccount")
          }
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setGoogleEmail(null);
          }}
          footer={null}
          destroyOnClose
          centered
          width={800}
          className={styles.modal}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleRegister}
            initialValues={{ role: "student" }}
          >
            {!googleEmail && (
              <>
                <Form.Item
                  label={t("registerPage.form.email")}
                  name="email"
                  className={styles.formItem}
                  rules={[
                    { required: true, message: t("registerPage.form.email") },
                    { type: "email", message: t("registerPage.form.email") },
                  ]}
                >
                  <Input
                    placeholder={t("registerPage.form.email")}
                    className={styles.input}
                  />
                </Form.Item>

                <Form.Item
                  label={t("registerPage.form.password")}
                  name="password"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: t("registerPage.form.password"),
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder={t("registerPage.form.password")}
                    className={styles.input}
                  />
                </Form.Item>

                <Form.Item
                  label={t("registerPage.form.confirmPassword")}
                  name="confirmPassword"
                  className={styles.formItem}
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: t("registerPage.form.confirmPassword"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder={t("registerPage.form.confirmPassword")}
                    className={styles.input}
                  />
                </Form.Item>
              </>
            )}

            {googleEmail && (
              <Form.Item
                label={t("registerPage.form.email")}
                className={styles.formItem}
              >
                <Input value={googleEmail} disabled className={styles.input} />
              </Form.Item>
            )}

            <h4 className={styles.sectionTitle}>
              {t("registerPage.sections.requiredInfo")}
            </h4>

            <Form.Item
              label={t("registerPage.form.mobile")}
              name="mobile"
              className={styles.formItem}
              rules={[
                { required: true, message: t("registerPage.form.mobile") },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit number",
                },
              ]}
            >
              <Input
                addonBefore="+91"
                maxLength={10}
                placeholder={t("registerPage.form.mobile")}
                onChange={handleMobileChange}
                className={styles.input}
              />
            </Form.Item>

            <Form.Item
              label={t("registerPage.form.username")}
              name="username"
              className={styles.formItem}
              rules={[
                { required: true, message: t("registerPage.form.username") },
                { min: 3, message: "Username must be at least 3 characters" },
              ]}
            >
              <Input
                placeholder={t("registerPage.form.username")}
                className={styles.input}
              />
            </Form.Item>

            <Form.Item
              label={t("registerPage.form.role")}
              name="role"
              className={styles.formItem}
              rules={[{ required: true, message: t("registerPage.form.role") }]}
            >
              <Select
                placeholder={t("registerPage.form.role")}
                className={styles.select}
              >
                <Option value="student">
                  {t("registerPage.form.roles.student")}
                </Option>
                <Option value="teacher">
                  {t("registerPage.form.roles.teacher")}
                </Option>
                <Option value="parent">
                  {t("registerPage.form.roles.parent")}
                </Option>
                <Option value="home-tutor">
                  {t("registerPage.form.roles.homeTutor")}
                </Option>
              </Select>
            </Form.Item>

            {!googleEmail && (
              <Form.Item
                name="agreement"
                valuePropName="checked"
                className={styles.formItem}
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(t("registerPage.form.agreement")),
                  },
                ]}
              >
                <Checkbox className={styles.checkbox}>
                  {t("registerPage.form.agreement")}
                </Checkbox>
              </Form.Item>
            )}

            <Divider className={styles.divider} />

            <h4 className={styles.sectionTitle}>
              {t("registerPage.sections.additionalInfo")}
            </h4>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={t("registerPage.optional.country")}
                  name="country"
                  className={styles.formItem}
                >
                  <Select
                    placeholder={t("registerPage.optional.country")}
                    className={styles.select}
                  >
                    <Option value="india">India</Option>
                    <Option value="usa">United States</Option>
                    <Option value="uk">United Kingdom</Option>
                    <Option value="canada">Canada</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("registerPage.optional.curriculum")}
                  name="curriculum"
                  className={styles.formItem}
                >
                  <Select
                    placeholder={t("registerPage.optional.curriculum")}
                    className={styles.select}
                  >
                    <Option value="cbse">CBSE</Option>
                    <Option value="icse">ICSE</Option>
                    <Option value="igcse">IGCSE</Option>
                    <Option value="ib">IB</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={t("registerPage.optional.subjects")}
              name="subjects"
              className={styles.formItem}
            >
              <Select
                mode="multiple"
                placeholder={t("registerPage.optional.subjects")}
                className={styles.select}
              >
                <Option value="mathematics">Mathematics</Option>
                <Option value="physics">Physics</Option>
                <Option value="history">History</Option>
                <Option value="social-studies">Social Studies</Option>
                <Option value="english">English</Option>
                <Option value="chemistry">Chemistry</Option>
                <Option value="geography">Geography</Option>
                <Option value="art">Art</Option>
                <Option value="biology">Biology</Option>
                <Option value="computer-science">Computer Science</Option>
                <Option value="music">Music</Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={t("registerPage.optional.grade")}
                  name="gradeLevel"
                  className={styles.formItem}
                >
                  <Select
                    placeholder={t("registerPage.optional.grade")}
                    className={styles.select}
                  >
                    <Option value="1">Grade 1</Option>
                    <Option value="2">Grade 2</Option>
                    <Option value="3">Grade 3</Option>
                    <Option value="4">Grade 4</Option>
                    <Option value="5">Grade 5</Option>
                    <Option value="6">Grade 6</Option>
                    <Option value="7">Grade 7</Option>
                    <Option value="8">Grade 8</Option>
                    <Option value="9">Grade 9</Option>
                    <Option value="10">Grade 10</Option>
                    <Option value="11">Grade 11</Option>
                    <Option value="12">Grade 12</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("registerPage.optional.languages")}
                  name="languagePreferences"
                  className={styles.formItem}
                >
                  <Select
                    mode="multiple"
                    placeholder={t("registerPage.optional.languages")}
                    className={styles.select}
                  >
                    <Option value="english">English</Option>
                    <Option value="french">French</Option>
                    <Option value="hindi">Hindi</Option>
                    <Option value="mandarin">Mandarin</Option>
                    <Option value="spanish">Spanish</Option>
                    <Option value="arabic">Arabic</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className={styles.submitButton}
              >
                {googleEmail
                  ? t("registerPage.form.completeRegistrationBtn")
                  : t("registerPage.form.createAccountBtn")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default RegisterDemoFlow;
