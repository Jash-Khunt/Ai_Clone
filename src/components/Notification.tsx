import { notification } from 'antd';
import { CheckCircleFilled, InfoCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { CSSProperties, ReactNode } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotifyOptions {
  type?: NotificationType;
  title: string;
  message: string;
  placement?: NotificationPlacement;
  duration?: number;
}

const typeIcons: Record<NotificationType, ReactNode> = {
  success: <CheckCircleFilled style={{ color: '#52c41a', fontSize: 20 }} />,
  info: <InfoCircleFilled style={{ color: '#1890ff', fontSize: 20 }} />,
  warning: <ExclamationCircleFilled style={{ color: '#faad14', fontSize: 20 }} />,
  error: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 20 }} />,
};

const show = ({
  type = 'info',
  title,
  message,
  placement = 'bottomRight',
  duration = 5,
}: NotifyOptions) => {
  notification.open({
    message: (
      <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
    ),
    description: (
      <div style={{ fontSize: 14, color: '#555' }}>{message}</div>
    ),
    icon: typeIcons[type],
    placement,
    duration,
    style: customStyle,
  });
};

const customStyle: CSSProperties = {
  background: '#fff',
  border: '1px solid #d9d9d9',
  borderRadius: 8,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
  padding: '16px',
  width: 380,
};

const Notification = { show };

export default Notification;
