import React, { useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Tag,
  Button,
  Space,
  Typography,
  Tabs,
} from "antd";
import {
  DownloadOutlined,
  StarFilled,
  FireOutlined,
  CloudDownloadOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import SearchFilters from "./SearchFilters";
import styles from "../styles/custom/WorksheetListing.module.less";
import CustomButton from "./CustomButton";

const { Title, Text } = Typography;

const worksheetData = [
  {
    id: 1,
    title: "Nouns and Pronouns",
    subject: "English",
    grade: "3",
    board: "CBSE",
    questions: 20,
    time: "30 min",
    downloads: 3200,
    rating: 4.7,
    tag: { label: "Most Downloaded", color: "purple" },
    description:
      "Grammar worksheet with fill-in-the-blanks and multiple choice questions",
    date: "2024-08-01",
  },
  {
    id: 2,
    title: "Fractions and Decimals",
    subject: "Maths",
    grade: "5",
    board: "Common Core",
    questions: 25,
    time: "45 min",
    downloads: 2800,
    rating: 4.8,
    tag: { label: "New", color: "green" },
    description: "Practice problems with fractions and decimal numbers",
    date: "2025-02-15",
  },
  {
    id: 3,
    title: "Water Cycle and Weather",
    subject: "Science",
    grade: "4",
    board: "CBSE",
    questions: 18,
    time: "35 min",
    downloads: 2100,
    rating: 4.9,
    tag: { label: "Popular", color: "blue" },
    description: "Learn about water cycle stages and weather patterns",
    date: "2024-12-10",
  },
];

const WorksheetListing: React.FC = () => {
  const [filters, setFilters] = useState({
    search: "",
    subject: "all",
    grade: "all",
    region: "all",
    board: "all",
    sort: "Popular",
  });

  const filteredData = useMemo(() => {
    let data = [...worksheetData];

    // Search filter
    if (filters.search.trim()) {
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Subject filter
    if (filters.subject !== "all") {
      data = data.filter((item) => item.subject === filters.subject);
    }

    // Grade filter
    if (filters.grade !== "all") {
      data = data.filter((item) => item.grade === filters.grade);
    }

    // Board filter
    if (filters.board !== "all") {
      data = data.filter((item) => item.board === filters.board);
    }

    // Sorting
    switch (filters.sort) {
      case "Rating":
        data.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Downloads":
        data.sort((a, b) => b.downloads - a.downloads);
        break;
      default: // Popular
        data.sort((a, b) => b.rating - a.rating);
        break;
    }

    return data;
  }, [filters]);

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <Row justify="space-between">
          <Col xs={24} md={12}>
            <h2 className={styles.headerTitle}>
              Explore 10,000+ Premium Worksheets
            </h2>
            <p className={styles.headerSubtitle}>
              Curated by educators, aligned with global curricula
            </p>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "right", marginTop: 5 }}>
            <Row gutter={[32, 16]} justify="end">
              <Col>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>50K+</span>
                  <span className={styles.statLabel}>Downloads</span>
                </div>
              </Col>
              <Col>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>15+</span>
                  <span className={styles.statLabel}>Subjects</span>
                </div>
              </Col>
              <Col>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>25+</span>
                  <span className={styles.statLabel}>Curricula</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Search + Filters */}
      <SearchFilters onFilterChange={setFilters} />

      <Text className={styles.worksheet}>
        Showing {worksheetData.length} worksheets
      </Text>

      {/* Optional Tabs for quick sort */}
      <Tabs
        defaultActiveKey="Popular"
        onChange={(key) => setFilters((prev) => ({ ...prev, sort: key }))}
        items={[
          { key: "Popular", label: <><RiseOutlined /> Trending</> },
          { key: "Newest", label: "Newest" },
          { key: "Downloads", label: <><CloudDownloadOutlined /> Most Downloaded</> },
        ]}
      />

      {/* Worksheets Grid */}
      <Row gutter={[24, 24]}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <Card className={styles.worksheetCard}>
                <div className={styles.topRow}>
                  <Tag color={item.tag.color} style={{ fontWeight: 600 }}>
                    {item.tag.label}
                  </Tag>
                  <div className={styles.rating}>
                    <StarFilled style={{ color: "#faad14" }} /> {item.rating}
                  </div>
                </div>
                <Title level={4} style={{ marginTop: 10 }}>
                  {item.title}
                </Title>
                <Text type="secondary">
                  ● {item.subject} • Grade {item.grade} • {item.board}
                </Text>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.metaRow}>
                  <span>{item.questions} questions</span>
                  <span>{item.time}</span>
                  <span>
                    <DownloadOutlined /> {item.downloads}
                  </span>
                </div>
                <Space style={{ marginTop: 12, gap: 22.5 }} wrap>
                  <CustomButton
                    text="Preview"
                    type="default"
                    size="large"
                    onClick={() => console.log("Preview clicked")}
                  />
                  <CustomButton
                    text="Use Template"
                    type="default"
                    size="large"
                    onClick={() => console.log("Use Template clicked")}
                  />
                  <CustomButton
                    text="Download"
                    type="primary"
                    size="large"
                    className={styles.downloadBtn}
                    prefixIcon={<DownloadOutlined />}
                    onClick={() => console.log("Download clicked")}
                  />
                </Space>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24} style={{ textAlign: "center", padding: "2rem" }}>
            <p>No worksheets found.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default WorksheetListing;
