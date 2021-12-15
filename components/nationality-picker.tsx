
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select

interface NationalityPickerProps {
    onSelect: (selected: string) => void
}

export const NationalityPicker: React.FC<NationalityPickerProps> = ({ onSelect }) => {

    const [nationalities, setNationalities] = useState<string[]>([])

    useEffect(() => {
        if(!nationalities.length) {
            axios.get<string[]>('/api/authors/nationalities')
                .then(({ data }) => setNationalities(data))
                .catch(err => console.log('Error fetching nationalities', err))
        }
    }, [nationalities])

    return (
        <>
            <Select defaultValue="all" onChange={onSelect} style={{ width: 160}}>
                <Option value="all">All Nationalities</Option>
                {
                    nationalities.map(item =>
                        <Option key={item} value={item}>{item}</Option>)
                }

            </Select>
        </>
    )
}