import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface DropdownFieldProps {
  label?: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  notFoundContent?: React.ReactNode;
  className?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  notFoundContent,
  className,
}) => {
  const selectId = `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} style={{ fontWeight: 500, marginBottom: '8px', display: 'block' }}>
          {label}
        </label>
      )}
      <Select
        id={selectId}
        placeholder={placeholder}
        value={value || undefined}
        onChange={onChange}
        style={{ width: '100%' }}
        allowClear
        notFoundContent={notFoundContent}
        className={className}
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DropdownField;
