import React, { useState } from 'react'
import Select from 'react-select'

const Books = (props) => {

  let books = []
  books = props.data

  const [selection, setSelection] = useState({value: 'all genres', label: 'all genres'})
  let genres = ['all genres']
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres = genres.concat(genre)
      }
    })
  })
  const options = genres.map(genre => {
    const result = {}
    result.value = genre
    result.label = genre
    return result 
  })

  const handleChange = selectedOption => {
    setSelection(selectedOption)
    console.log(`current selection: ${selection.value}`)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(a => selection.value === 'all genres' || a.genres.includes(selection.value)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>filter by genre:</h3>
      <Select value={selection} onChange={handleChange} options={options} />
    </div>
  )
}

export default Books