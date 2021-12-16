import { Col, Row } from 'antd'
import { Books } from '../components/books'
import { NationalityPicker } from '../components/nationality-picker'
import { Authors } from '../components/authors'

import React, { useCallback, useEffect, useState } from 'react'
import { Author, AuthorWithBooksCount } from '../interfaces/author'
import { Book, BookWithAuthor } from '../interfaces/book'
import axios from 'axios'

export const Tables: React.FC = () => {

    const [authors, setAuthors] = useState<AuthorWithBooksCount[]>([])
    const [books, setBooks] = useState<BookWithAuthor[]>([])
    const [filteredBooks, setFilteredBooks] = useState<BookWithAuthor[]>([])
    const [filteredAuthors, setFilteredAuthors] = useState<AuthorWithBooksCount[]>([])

    const [nationalityFilter, setNationalityFilter] = useState('all')

    const [authorSearch, setAuthorSearch] = useState('')
    const [booksSearch, setBooksSearch] = useState('')

    const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null)


    const handleCountClick = useCallback((id: number) => {
        setAuthorSearch('')
        setSelectedAuthor(id)
    }, [])


    useEffect(() => {
        if (selectedAuthor) {
            const filtered = books.filter(book => book.author_id === selectedAuthor)
            setFilteredBooks(filtered)
        }
    }, [selectedAuthor])


    useEffect(() => {
        if (nationalityFilter === 'all') {
            setFilteredAuthors([...authors])
            setFilteredBooks([...books])
        } else {
            const authorsByNationality = authors.filter(author =>
                author.nationality.toLocaleLowerCase() === nationalityFilter.toLocaleLowerCase())
            setFilteredAuthors(authorsByNationality)

            const booksFiltered = books.filter(book =>
                authorsByNationality.some(author => author.id === book.author_id))
            setFilteredBooks(booksFiltered)
        }
    }, [nationalityFilter])


    useEffect(() => {
        const query = authorSearch.toLocaleLowerCase()
        if (authorSearch) {
            const filtered = authors.filter(author =>
                author.id.toString().includes(query) ||
                author.booksCount.toString().includes(query) ||
                author.first_name.toLocaleLowerCase().includes(query) ||
                author.last_name.toLocaleLowerCase().includes(query) ||
                author.nationality.toLocaleLowerCase().includes(query)
            )
            setFilteredAuthors(filtered)
        } else {
            setFilteredAuthors([...authors])
        }
    }, [authorSearch])


    useEffect(() => {
        const query = booksSearch.toLocaleLowerCase()
        if (booksSearch) {
            const filtered = books.filter(book =>
                book.id.toString().includes(query) ||
                book.title.toLocaleLowerCase().includes(query) ||
                book.author.toLocaleLowerCase().includes(query)
            )
            setFilteredBooks(filtered)
        } else {
            setFilteredBooks([...books])
        }
    }, [booksSearch])


    useEffect(() => {
        if (!authors.length) {
            axios.get<AuthorWithBooksCount[]>('/api/authors')
                .then(({ data }) => {
                    setAuthors(data)
                    setFilteredAuthors(data)
                })
                .catch(err => console.log('Error fetching authors', err))
        }
    }, [authors])


    useEffect(() => {
        async function fetchBooksData() {
            try {
                const { data: books } = await axios.get<Book[]>('/api/books')
                let withAuthors: BookWithAuthor[] = []

                for (let book of books) {
                    const { data: author } = await axios.get<Author>(`/api/authors/${book.author_id}`)
                    withAuthors = [...withAuthors, {
                        ...book,
                        author: `${author.first_name} ${author.last_name}`
                    }]
                }
                setBooks(withAuthors)
                setFilteredBooks(withAuthors)

            } catch (error) {
                console.error('Error fetching books data')
            }
        }

        if (!books.length) {
            fetchBooksData()
        }
    }, [books])

    return (

        <Row gutter={[16, 16]}>

            <Col xs={24} md={24}>

                <NationalityPicker
                    onSelect={setNationalityFilter} />

            </Col>

            <Col xs={24} md={24}>

                <Authors
                    onCountClicked={handleCountClick}
                    onSearch={setAuthorSearch}
                    authors={filteredAuthors} />

            </Col>

            <Col xs={24} md={24}>

                <Books
                    onSearch={setBooksSearch}
                    books={filteredBooks} />

            </Col>

        </Row>


    )
}
