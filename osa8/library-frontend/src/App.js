import React, { useState } from 'react'
import { Query, Mutation, useMutation, useApolloClient } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

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
    author {
      name
    }
    genres
  }
}
`

const CURRENT_USER = gql`
{
  me {
    username
    favoriteGenre
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
    author {
      name
    }
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
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`


const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const [login] = useMutation(LOGIN)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      {page === 'authors' && <Query query={ALL_AUTHORS}>
        {(result) => {
          if (result.loading) {
            return <div>loading...</div>
          }
          return (
            <Mutation mutation={EDIT_AUTHOR} refetchQueries={[{ query: ALL_AUTHORS }]} >
              {(editAge) =>
                <Authors data={result.data.allAuthors} editAge={editAge} token={token} />}
            </Mutation>
          )
        }}
      </Query>}

      {page === 'recommend' && <Query query={CURRENT_USER}>
        {(resultUser) => {
          if (resultUser.loading) {
            return <div>loading...</div>
          }
          return (
            <Query query={ALL_BOOKS} >
              {(resultBooks) => {
                if (resultBooks.loading) {
                  return <div>loading...</div>
                }
                return <Recommend user={resultUser.data.me} books={resultBooks.data.allBooks} />
              }}
            </Query>
          )
        }}
      </Query> }

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

      {page === 'login' && <LoginForm login={login} setToken={(token) => setToken(token)} resetPage={() => setPage('authors')} /> }

    </div>
  )
}

export default App