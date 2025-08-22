import React from 'react';
import { Card, Typography, Tag, Space } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import CustomButton from './CustomButton';
import styles from '../styles/custom/planSection.module.less';

const { Title, Text } = Typography;

export interface PlanCardProps {
  tag?: string;
  title: string;
  price: Record<string, string>;
  worksheets: string;
  buttonLabel: string;
  highlight?: boolean;
  htmlDescription?: string;
  region: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  tag,
  title,
  price,
  worksheets,
  buttonLabel,
  highlight,
  htmlDescription,
  region,
}) => {
  const isHighlighted = highlight === true;
  const displayPrice = price[region] || price['IN'] || '';

  return (
    <div className={`${styles.planCardWrapper} ${isHighlighted ? styles.highlighted : ''}`}>
      {tag && (
        <Tag color="volcano" className={styles.planCardTag}>
          <CrownOutlined className={styles.planCardTagIcon} />
          {tag}
        </Tag>
      )}

      <Card hoverable className={`${styles.planCard} ${isHighlighted ? styles.highlighted : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Space direction="vertical" className={styles.planCardHeader} size={2}>
            <Title level={3} className={styles.planCardTitle}>
              {title}
            </Title>
            <Title level={1} className={styles.planCardPriceTitle}>
              <span className={styles.price}>{displayPrice}</span>
              <span className={styles.priceUnit}>/month</span>
            </Title>
            <Text strong className={styles.planCardWorksheet}>
              {worksheets}
            </Text>
          </Space>

          <div className={styles.planCardFeatures}>
            {htmlDescription && (
              <div 
                className={styles.planCardHtmlDescription}
                dangerouslySetInnerHTML={{ __html: htmlDescription }}
              />
            )}
          </div>

          <CustomButton
            text={buttonLabel}
            size="large"
            className={isHighlighted ? styles.customButtonPrimary : styles.customButtonDark}
          />
        </div>
      </Card>
    </div>
  );
};

export default PlanCard;
