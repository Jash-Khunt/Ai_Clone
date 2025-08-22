import React from 'react';
import { Card, Button, Typography } from 'antd';
import { ReactNode } from 'react';

const { Title, Paragraph } = Typography;

interface StoryActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonType?: 'primary' | 'default';
  onClick?: () => void;
}

const StoryActionCard: React.FC<StoryActionCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonType = 'primary',
  onClick
}) => {
  return (
    <Card className="story-action-card" bordered={false}>
      <div className="icon">{icon}</div>
      <Title level={4}>{title}</Title>
      <Paragraph>{description}</Paragraph>
      <Button type={buttonType} block onClick={onClick}>
        {buttonText}
      </Button>
    </Card>
  );
};

export default StoryActionCard;
