import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    author
  }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`
const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor (
    name: $name
    setBornTo: $setBornTo
  ) {
    name 
    born
    bookCount
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {page === 'authors' && <Query query={ALL_AUTHORS}>
        {(result) => {
          if (result.loading) {
            return <div>loading...</div>
          }
          return (
            <Mutation mutation={EDIT_AUTHOR} refetchQueries={[{ query: ALL_AUTHORS }]} >
              {(editAge) =>
                <Authors data={result.data.allAuthors} editAge={editAge} />}
            </Mutation>
          )
        }}
      </Query>}

      {page === 'books' && <Query query={ALL_BOOKS}>
        {(result) => {
          if (result.loading) {
            return <div>loading...</div>
          }      
          return <Books data={result.data.allBooks} />
        }}
      </Query>}

      {page === 'add' && <Mutation mutation={ADD_BOOK} refetchQueries={[{ query: ALL_AUTHORS }, { query: ALL_BOOKS}]} >
        {(addBook) => 
        <NewBook addBook={addBook} />
        }
      </Mutation> }

    </div>
  )
}

export default App