import { useDispatch } from "react-redux";
import { Card, Upload, Typography, Table, Modal, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomButton from "./CustomButton";
import { useState } from "react";
import { useFileUploadHandler } from "../hooks/useFileUploadHandler";
import FileActions from "./FileActions";
import styles from "../styles/custom/worksheetPage.module.less";
import StepButtonGroup from "./StepButtonGroup";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

type FileMeta = {
  uid: string;
  name: string;
  type: string;
  url: string;
  originFileObj?: File;
};

const Step3UploadContent: React.FC<Props> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const { fileList, handleFileChange, handleRemove } = useFileUploadHandler();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { t } = useTranslation();

  const columns = [
    {
      title: <div className={styles.columnFileName}>{t("step3.fileName")}</div>,
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <div className={styles.columnFileName}>{text}</div>
      ),
    },
    {
      title: <div className={styles.columnActions}>{t("step3.actions")}</div>,
      key: "actions",
      align: "right" as const,
      render: (_: any, record: FileMeta) => {
        const isImage = record.type?.startsWith("image/");
        return (
          <FileActions
            isImage={isImage}
            url={record.url}
            onPreview={() => setPreviewImage(record.url || "")}
            onDelete={() => handleRemove(record.uid)}
          />
        );
      },
    },
  ];

  return (
    <Card className={styles.container}>
      <div className={styles.centeredHeader}>
        <Title level={3} style={{ marginBottom: 4 }}>
          {t("step3.title")}
        </Title>
        <Text type="secondary">{t("step3.subtitle")}</Text>
      </div>

      <Upload.Dragger
        multiple
        accept=".jpg,.jpeg,.png,.gif,.pdf"
        fileList={[]} // prevent default rendering
        onChange={handleFileChange}
        showUploadList={false}
        action="#"
        customRequest={() => {}}
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined style={{ fontSize: 32, color: "#999" }} />
        </p>
        <p className={styles.uploadInstructions}>{t("step3.dragDrop")}</p>
        <CustomButton text={t("step3.chooseFiles")} style={{ marginTop: 12 }} />
        <p className={styles.uploadNote}>{t("step3.supportedFormats")}</p>
      </Upload.Dragger>

      {fileList.length > 0 && (
        <div className={styles.tableWrapper}>
          <Typography.Text strong>{t("step3.uploadedFiles")}</Typography.Text>
          <div className={styles.tableContainer}>
            <Table
              dataSource={fileList}
              columns={columns}
              pagination={false}
              rowKey="uid"
              size="small"
              scroll={{ y: 200 }}
            />
          </div>
        </div>
      )}

      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
        centered
        width={600}
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt={t("step3.previewAlt")}
            className={styles.modalImage}
          />
        )}
      </Modal>

      <StepButtonGroup
        onBack={onBack}
        onNext={onNext}
        disabled={fileList.length === 0}
      />
    </Card>
  );
};

export default Step3UploadContent;
