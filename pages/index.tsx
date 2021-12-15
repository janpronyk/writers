import Head from 'next/head'
import { Col, Row } from 'antd'
import type { NextPage } from 'next'
import { Books } from '../components/books'
import { NationalityPicker } from '../components/nationality-picker'
import { Authors } from '../components/authors'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react'
import { Author, AuthorWithBooksCount } from '../interfaces/author'
import { Book, BookWithAuthor } from '../interfaces/book'
import axios from 'axios'

const Home: NextPage = () => {
  const [authors, setAuthors] = useState<AuthorWithBooksCount[]>([])
  const [books, setBooks] = useState<BookWithAuthor[]>([])
  const [filteredBooks, setFilteredBooks] = useState<BookWithAuthor[]>([])
  const [filteredAuthors, setFilteredAuthors] = useState<AuthorWithBooksCount[]>([])

  const [ nationalityFilter, setNationalityFilter] = useState('all')


  useEffect(() => {
    if(nationalityFilter === 'all') {
      setFilteredAuthors([...authors])
      setFilteredBooks([...books])
    } else {
      const authorsByNationality = authors.filter(author => author.nationality.toLocaleLowerCase() === nationalityFilter.toLocaleLowerCase())
      setFilteredAuthors(authorsByNationality)

      const booksFiltered = books.filter(book => 
        authorsByNationality.some(author => author.id === book.author_id))
      setFilteredBooks(booksFiltered)
    }
  }, [nationalityFilter])

  useEffect(() => {
    if (!authors.length) {
      axios.get<AuthorWithBooksCount[]>('/api/authors')
        .then(({ data }) => setAuthors(data))
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

      } catch (error) {
        console.error('Error fetching books data')
      }
    }

    if (!books.length) {
      fetchBooksData()
    }
  }, [books])

  return (
    <div className={styles.container}>
      <Head>
        <title>Writers</title>
        <meta name="description" content="Demo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <Row gutter={[16, 16]}>

          <Col xs={24} md={24}>

            <NationalityPicker
              onSelect={setNationalityFilter} />

          </Col>

          <Col xs={24} md={24}>

            <Authors authors={filteredAuthors} />

          </Col>

          <Col xs={24} md={24}>

            <Books books={filteredBooks} />

          </Col>

        </Row>


      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
