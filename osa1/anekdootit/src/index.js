import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => {
    return (
        <div>
            <h1>
                {text}
            </h1>
        </div>
    )
}

const TextDisplay = ({text1, number, text2}) => {
    return(
        <div>
            {text1 + " " + number + " " + text2}
        </div>
    )

}

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const randomInt = (max) => {
    const result = Math.floor(Math.random() * Math.floor(max))
    if(result >= max) return max - 1
    else return result
}



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const addVote = () => () => {
    copy[selected] += 1
    setPoints(copy)
}

const mostVoted = () => points.indexOf(Math.max.apply(null, points))

  const copy = [...points]

  return (
    <div>
      <Title text="Anecdote of the day" />
      {props.anecdotes[selected]}
      <br></br>
      <TextDisplay text1="has" number={points[selected]} text2="votes" />
      <br></br>
      <Button text="vote" handleClick={addVote()} />
      <Button text="next anecdote" handleClick={() => setSelected(randomInt(anecdotes.length))} />
      <br></br>
      <Title text="Anecdote with most votes" />
      {props.anecdotes[mostVoted()]}
      <TextDisplay text1="has" number={points[mostVoted()]} text2="votes" />
    </div>
  )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
