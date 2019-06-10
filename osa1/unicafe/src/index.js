import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
    return (
        <>
            <h1>
                {props.name}
            </h1>
        </>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const Statistic = ({text, stat, extra}) => {
    if(!extra) {
        return (
            <tr>
                <td>{text}</td>
                <td>{stat}</td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>{text}</td>
                <td>{stat}</td>
                <td>{extra}</td>
            </tr>
        )
    }
}

const Statistics = ({good,neutral,bad}) => {

    const all = () => good + neutral + bad
    const positive = () => (good * 100) / all()
    const average = () => (good - bad) / all()

    if(all() === 0) {
        return (
            <>
                <Title name="statistics" />
                No feedback given
            </>
        )
    } else {
        return (
            <>
                <Title name="statistics" />
                <table>
                    <tbody>
                        <Statistic text="good" stat={good} />
                        <Statistic text="neutral" stat={neutral} />
                        <Statistic text="bad" stat={bad} />
                        <Statistic text="all" stat={all()} />
                        <Statistic text="average" stat={average()} />
                        <Statistic text="positive" stat={positive()} extra="%" />
                    </tbody>
                </table>
            </>
        )
    }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <Title name="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)