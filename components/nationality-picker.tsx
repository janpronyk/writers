import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { useApp } from "../hooks/useApp";

const { Option } = Select;

interface NationalityPickerProps {
  value: string;
  onSelect: (selected: string) => void;
}

export const NationalityPicker: React.FC<NationalityPickerProps> = ({
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
      <Select
        defaultValue="all"
        value={value}
        onChange={onSelect}
        style={{ width: 160 }}
      >
        <Option value="all">All Nationalities</Option>
        {nationalities.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </>
  );
};
