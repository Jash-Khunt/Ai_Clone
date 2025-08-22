import React from "react";
import { Modal, Descriptions } from "antd";

const GoogleAuthModal = ({
  open,
  onClose,
  profile,
}: {
  open: boolean;
  onClose: () => void;
  profile: any;
}) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Google Profile">
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Name">{profile.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
        <Descriptions.Item label="Picture">
          <img
            src={profile.picture}
            alt="Profile"
            style={{ width: 60, borderRadius: "50%" }}
          />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default GoogleAuthModal;
