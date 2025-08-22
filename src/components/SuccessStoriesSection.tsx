import React from "react";
import { Card, Avatar, Tag, Typography } from "antd";
import { VideoCameraOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import styles from "../styles/custom/SuccessStoriesSection.module.less";
import CustomButton from "./CustomButton";

const {Title, Text} = Typography;

const featuredStories = [
  {
    name: "Sarah Mitchell",
    role: "Parent",
    title: "Amazing Tool for Homeschooling",
    desc: "AIWorksheetPro has revolutionized how I create learning materials for my kids..."
  },
  {
    name: "Dr. James Wilson",
    role: "Teacher",
    title: "Saves Hours of Planning Time",
    desc: "As a 5th grade teacher, this tool helps me create engaging worksheets in minutes..."
  },
  {
    name: "Maria Rodriguez",
    role: "Tutor",
    title: "Perfect for One-on-One Sessions",
    desc: "I can customize worksheets for each student's specific needs and learning pace..."
  }
];

const SuccessStoriesSection: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Title level={3}><div style={{fontWeight: 700}}>Success Stories</div></Title>
        <p>See how AIWorksheetPro is transforming education</p>
      </div>

      {/* Top Cards */}
      <div className={styles.cardsRow}>
        <Card className={`${styles.card} ${styles.purpleCard}`}>
          <div className={`${styles.iconWrapper} ${styles.purpleIcon}`}>
            <VideoCameraOutlined />
          </div>
          <div className={styles.title}>Share Your Story</div>
          <div className={styles.subtitle}>
            Share your experience with AIWorksheetPro and earn 2 FREE Premium Worksheets!
          </div>
          <CustomButton
            text="Upload Video Story"
            prefixIcon={<VideoCameraOutlined />}
            type="primary"
            size="large"
            className={styles.storybtn}
            block
          />
        </Card>

        <Card className={`${styles.card} ${styles.greenCard}`}>
          <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
            <StarOutlined />
          </div>
          <div className={styles.title}>Browse Success Stories</div>
          <div className={styles.subtitle}>
            Get inspired by real stories from educators and parents worldwide
          </div>
          <CustomButton
            text="Browse Stories"
            prefixIcon={<StarOutlined />}
            type="default"
            block
          />
        </Card>
      </div>

      {/* Featured Stories */}
      <div className={styles.featured}>
        <h3>Featured Stories</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))", gap: "1rem" }}>
          {featuredStories.map((story, index) => (
            <Card key={index} className={styles.storyCard}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <Avatar size={40} icon={<UserOutlined />} className={styles.avatar} />
                <div>
                    <div>
                        <strong>{story.name}</strong>
                    </div>
                    <Tag className={styles.tag}>{story.role}</Tag>
                </div>
              </div>
                <Title level={5} className={styles.storyTitle}>{story.title}</Title>
                <Text className={styles.storyDesc}>{story.desc}</Text>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesSection;
