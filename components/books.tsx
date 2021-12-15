import React from "react";
import { Table } from "antd";
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
    books: Book[]
}

export const Books: React.FC<BooksProps> = ({ books }) => {

    return (
        <>
            <h2>Books</h2>
            <Table dataSource={books} columns={columns} rowKey={"id"} />
        </>
    )
}