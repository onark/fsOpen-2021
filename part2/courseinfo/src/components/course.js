import React from 'react'

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
        {parts.map(part =>
          <div key={part.id}>
            <Part part={part.name} exercise={part.exercises} />
          </div>
        )}
    </div>
  )
}

const Part = ({ part, exercise }) => {
  return (
    <div>
      <p>{part} {exercise}</p>
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      <strong>Exercises in total: {total}</strong>
    </div>
  )
}

const Course = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header course={"Web Debelopment Curriculum"} />
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course