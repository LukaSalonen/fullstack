import React, { useState } from 'react'
import Select from 'react-select'

const AgeForm = (props) => {
  const [born, setBorn] = useState('')
  const [selection, setSelection] = useState('')

  const options = props.data.map(author => {
    const result = {}
    result.value = author.name
    result.label = author.name
    return result
  })

  const handleChange = selectedOption => {
    setSelection(selectedOption)
    console.log(`Option selected:`, selectedOption);
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAge({
      variables: { name: selection.value, setBornTo: Number(born) }
    })

    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select value={selection} onChange={handleChange} options={options} />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AgeForm

