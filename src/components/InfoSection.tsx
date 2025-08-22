import React from 'react';
import { Col, Typography } from 'antd';
import styles from '../styles/custom/Step1.module.less';

const { Paragraph } = Typography;

interface InfoSectionProps {
  title: string;
  titleColor?: string;
  text: string;
  textColor?: string;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  titleColor = 'black',
  text,
  textColor = 'black',
  className = '',
}) => {
  return (
    <Col className={`${styles.miniContainer} ${className}`}>
      <Paragraph style={{ color: titleColor, fontWeight: 600 }}>{title}</Paragraph>
      <div style={{ color: textColor, lineHeight: 1.5 }}>
        {text}
      </div>
    </Col>
  );
};

export default InfoSection;
