import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
}

export const Authors: React.FC<AuthorsProps> = ({ authors }) => {

    return (
        <>
            <h2>Authors</h2>
            <Table dataSource={authors} columns={columns} rowKey={"id"} />
        </>
    )
}