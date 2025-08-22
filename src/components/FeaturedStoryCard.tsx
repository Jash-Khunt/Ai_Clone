import React from 'react';
import { Card, Typography, Tag, Avatar } from 'antd';

const { Title, Paragraph } = Typography;

interface FeaturedStoryCardProps {
  avatar: string;
  name: string;
  role: string;
  title: string;
  description: string;
}

const FeaturedStoryCard: React.FC<FeaturedStoryCardProps> = ({
  avatar,
  name,
  role,
  title,
  description
}) => {
  return (
    <Card className="featured-story-card" bordered={false}>
      <div className="story-header">
        <Avatar src={avatar} size="large" />
        <div>
          <Title level={5}>{name}</Title>
          <Tag>{role}</Tag>
        </div>
      </div>
      <Title level={4}>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </Card>
  );
};

export default FeaturedStoryCard;
