import React from 'react';
import { Typography } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import styles from '../styles/custom/contactPage.module.less';

const { Title } = Typography;

const Note: React.FC = () => {
  return (
    <div className={styles.noteContainer}>
      <Title level={4} style={{ color: 'white' }}>
        🇮🇳 Made in India
      </Title>
      <Title level={4} style={{ color: 'white' }}>
        Crafted with <HeartFilled className={styles.noteHeart} /> in Surat
      </Title>
    </div>
  );
};

export default Note;
