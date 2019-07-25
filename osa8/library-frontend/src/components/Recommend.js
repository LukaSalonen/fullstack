import React from 'react'

const Recommend = (props) => {
  const booksToShow = props.books.filter(book => book.genres.includes(props.user.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{props.user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend