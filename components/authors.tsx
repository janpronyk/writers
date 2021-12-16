import React from "react";
import { Col, Input, Row, Table } from "antd";
import { Author } from "../interfaces/author";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Full Name',
        dataIndex: 'full_name',
        render: (text: string, record: Author, index: number) =>
            `${record.first_name} ${record.last_name}`,
        key: 'full_name'
    },
    {
        title: 'Nationality',
        dataIndex: 'nationality',
        key: 'nationality'
    },
    {
        title: 'Books Count',
        dataIndex: 'booksCount',
        key: 'booksCount'
    }
]

interface AuthorsProps {
    authors: Author[]
    onSearch: (query: string) => void
}

const { Search } = Input

export const Authors: React.FC<AuthorsProps> = (
    { authors, onSearch }) => {

    return (
        <>
            <Row>
                <Col span={12}>
                    <h2>Authors</h2>
                </Col>

                <Col span={12}>
                    <Search 
                        placeholder="Search authors..."
                        onChange={e => onSearch(e.target.value)} 
                        allowClear />
                </Col>
            </Row>
            <Table dataSource={authors} columns={columns} rowKey={"id"} />
        </>
    )
}