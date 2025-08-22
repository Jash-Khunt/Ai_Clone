import React from 'react';
import { Space, Typography } from 'antd';

const { Text } = Typography;

interface Props {
  code: string;
  label: string;
}

const LanguageOptionItem: React.FC<Props> = ({ label }) => {
  return (
    <Space>
      <Text className="language-option-label">{label}</Text>
    </Space>
  );
};

export default LanguageOptionItem;
