import React from 'react';
import { Card, Typography, Progress } from 'antd';
import styles from '../styles/custom/dashboard.module.less';

const { Title, Text } = Typography;

interface GrowthCard {
  type: 'growth';
  title: string;
  current: number;
  previous: number;
  icon: React.ElementType;
  iconClass: string;
}

interface UsageCard {
  type: 'usage';
  title: string;
  used: number;
  total: number;
  icon: React.ElementType;
  iconClass: string;
}

type StatCardProps = GrowthCard | UsageCard;

const StatCard: React.FC<StatCardProps> = (props) => {
  const Icon = props.icon;

  let valueDisplay = '';
  let subtitle = '';
  let progress = 0;

  if (props.type === 'growth') {
    const { current, previous } = props;
    const diff = current - previous;
    const percent = previous > 0 ? Math.round((diff / previous) * 100) : 0;
    valueDisplay = current.toLocaleString();
    subtitle = `${percent >= 0 ? '+' : ''}${percent}% from last month`;
  }

  if (props.type === 'usage') {
    const { used, total } = props;
    const remaining = total - used;
    progress = total > 0 ? Math.round((used / total) * 100) : 0;
    valueDisplay = `${used}/${total}`;
    subtitle = `${remaining} remaining today`;
  }

  return (
    <Card className={styles.customCard}>
      <div className={styles.statTop}>
        <Title level={4} style={{fontWeight: 600, color:'black'}}>{props.title}</Title>
        <div className={`${styles.iconCircle} ${styles[props.iconClass]}`}>
          <Icon />
        </div>
      </div>
      <Title level={3} className={styles.statValue}>
        {valueDisplay}
      </Title>
      <Text type="secondary">{subtitle}</Text>
      {props.type === 'usage' && <Progress percent={progress} showInfo={false} />}
    </Card>
  );
};

export default StatCard;
