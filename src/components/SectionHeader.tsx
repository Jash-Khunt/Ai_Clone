import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div>
    <Title level={3} style={{fontWeight: 600}}>{title}</Title>
    <Paragraph type="secondary">{subtitle}</Paragraph>
  </div>
);

export default SectionHeader;
