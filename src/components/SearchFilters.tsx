import React, { useState } from "react";
import { Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DropdownField from "./DropdownField"; // <-- using your custom dropdown
import styles from "../styles/custom/WorksheetListing.module.less";

const { Title, Text } = Typography;

interface SearchFiltersProps {
  onFilterChange: (filters: {
    search: string;
    subject: string;
    grade: string;
    region: string;
    board: string;
    sort: string;
  }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    subject: "all",
    grade: "all",
    region: "all",
    board: "all",
    sort: "Popular",
  });

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={styles.searchFilters}>
      {/* Search bar */}
      <Input
        placeholder="Search worksheets... (e.g., fractions, grade 5, CBSE)"
        prefix={<SearchOutlined />}
        value={filters.search}
        onChange={(e) => updateFilter("search", e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.filtersContainer}>
        <div className={styles.filterRow}>
          {/* Subject */}
          <DropdownField
            value={filters.subject}
            placeholder="Select Subject"
            options={[
              { value: "all", label: "Subject: All" },
              { value: "English", label: "English" },
              { value: "Maths", label: "Maths" },
              { value: "Science", label: "Science" },
            ]}
            onChange={(val) => updateFilter("subject", val)}
            className={styles.sortDropdown}
          />

          {/* Grade */}
          <DropdownField
            value={filters.grade}
            placeholder="Select Grade"
            options={[
              { value: "all", label: "Grade: All" },
              ...[1, 2, 3, 4, 5, 6, 7].map((g) => ({
                value: g.toString(),
                label: `Grade ${g}`,
              })),
            ]}
            onChange={(val) => updateFilter("grade", val)}
            className={styles.sortDropdown}
          />

          {/* Region */}
          <DropdownField
            value={filters.region}
            placeholder="Select Region"
            options={[
              { value: "all", label: "Region: All" },
              { value: "US", label: "US" },
              { value: "UK", label: "UK" },
              { value: "India", label: "India" },
            ]}
            onChange={(val) => updateFilter("region", val)}
            className={styles.sortDropdown}
          />

          {/* Board */}
          <DropdownField
            value={filters.board}
            placeholder="Select Board"
            options={[
              { value: "all", label: "Board: All" },
              { value: "CBSE", label: "CBSE" },
              { value: "Common Core", label: "Common Core" },
              { value: "ICSE", label: "ICSE" },
            ]}
            onChange={(val) => updateFilter("board", val)}
            className={styles.sortDropdown}
          />
        </div>

        <div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Text style={{ marginTop: 12 }}> Sort: </Text>
            <DropdownField
              value={filters.sort}
              placeholder="Sort by"
              options={[
                { value: "Popular", label: "Popular" },
                { value: "Rating", label: "Rating" },
                { value: "Newest", label: "Newest" },
                { value: "Downloads", label: "Downloads" },
              ]}
              onChange={(val) => updateFilter("sort", val)}
              className={styles.sortDropdown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
