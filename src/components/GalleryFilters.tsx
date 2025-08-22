import { Input, Select, Button } from 'antd';
import {
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import styles from '../styles/custom/galleryFilter.module.less'

const { Option } = Select;

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filterType: 'all' | 'images' | 'pdfs';
  setFilterType: (val: 'all' | 'images' | 'pdfs') => void;
  getFilterCount: (type: 'all' | 'images' | 'pdfs') => number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const GalleryFilters: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  getFilterCount,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className={styles.searchFilters}>
      {/* Search Input */}
      <div className={styles.searchSection}>
        <Input
          placeholder="Search files..."
          prefix={<SearchOutlined />}
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* File Type Filter */}
      <div className={styles.filterSection}>
        <Select
          value={filterType}
          onChange={setFilterType}
          className={styles.filterSelect}
        >
          <Option value="all">All Files ({getFilterCount('all')})</Option>
          <Option value="images">Images ({getFilterCount('images')})</Option>
          <Option value="pdfs">PDFs ({getFilterCount('pdfs')})</Option>
        </Select>
      </div>

      {/* View Toggle */}
      <div className={styles.viewToggle}>
        <Button
          type="text"
          icon={<AppstoreOutlined />}
          onClick={() => setViewMode('grid')}
          className={`${styles.viewButton} ${viewMode === 'grid' ? styles.activeView : ''}`}
        />

        <Button
          type="text"
          icon={<UnorderedListOutlined />}
          onClick={() => setViewMode('list')}
          className={`${styles.viewButton} ${viewMode === 'list' ? styles.activeView : ''}`}
        />

      </div>
    </div>
  );
};

export default GalleryFilters;
