import React from "react";
import { Col, Input, Row, Table } from "antd";
import { Book } from "../interfaces/book";
import axios from "axios";
import { Author } from "../interfaces/author";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author'
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year'
    }
]


interface BooksProps {
    books: Book[],
    onSearch: (query: string) => void
}

const { Search } = Input

export const Books: React.FC<BooksProps> = ({ books, onSearch }) => {

    return (
        <>
            <Row>
                <Col span={12}>
                    <h2>Books</h2>
                </Col>

                <Col span={12}>
                    <Search
                        placeholder="Search authors..."
                        onChange={e => onSearch(e.target.value)}
                        allowClear />
                </Col>
            </Row>
            <Table dataSource={books} columns={columns} rowKey={"id"} />
        </>
    )
}