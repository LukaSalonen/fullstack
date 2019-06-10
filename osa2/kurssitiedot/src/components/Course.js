import React from 'react'

const Header = ({courseName}) => {
    return (
      <>
        <h1>{courseName}</h1>
      </>
    )
  }
  
  const Content = ({parts}) => parts.map(a => 
      <Part part={a.name} exercise={a.exercises} key={a.id} />
    )
  
  const Part = ({part, exercise}) => {
    return (
      <>
        <p>
          {part} {exercise}
        </p>
      </>
      )
    }
  
  const Total = ({parts}) => {
  
    const exercisesSum = () => parts.map(a => a.exercises).reduce((b,c) => b + c,0)
  
    return (
      <>
        <p>
          <b> Total of {exercisesSum()} exercises </b>
        </p>
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }

  export default Course