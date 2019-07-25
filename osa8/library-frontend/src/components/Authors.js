import React from 'react'
import AgeForm from './AgeForm'

const Authors = (props) => {

  let authors = []
  authors = props.data

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token && <AgeForm data={props.data} editAge={props.editAge} />}
    </div>
  )
}

export default Authors