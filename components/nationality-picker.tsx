import React, { useEffect, useState } from "react";
import { Select } from "antd";

import { useApp } from "../hooks/useApp";

const { Option } = Select;

interface NationalityPickerProps {
  value: string;
  onSelect: (selected: string) => void;
}

const NationalityPicker: React.FC<NationalityPickerProps> = ({
  onSelect,
  value,
}) => {
  const { authors } = useApp();
  const [nationalities, setNationalities] = useState<string[]>([]);

  useEffect(() => {
    if (authors) {
      const nationalitiesSet = new Set(
        authors.map((author) => author.nationality)
      );
      setNationalities(Array.from(nationalitiesSet));
    }
  }, [authors]);

  return (
    <>
      <label>
        <span style={{ marginRight: "20px" }}>Filter by nationality:</span>
        <Select
          defaultValue="all"
          value={value}
          onChange={onSelect}
          aria-label="Filter by nationality"
          style={{ width: 160 }}
        >
          <Option value="all" aria-label="all">
            All Nationalities
          </Option>
          {nationalities &&
            nationalities.map((item) => (
              <Option key={item} value={item} aria-label={item}>
                {item}
              </Option>
            ))}
        </Select>
      </label>
    </>
  );
};

NationalityPicker.displayName = "NationalityPicker";

export default NationalityPicker;
