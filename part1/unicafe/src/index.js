import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive: ') {
    return (
      <tr>
        <td>
          {text}
        </td>
        <td>
          <>{value} %</>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        <>{value}</>
      </td>
    </tr>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ feedback, statsHeader }) => {
  const calculateAll = () => feedback.good + feedback.neutral + feedback.bad
  const calculateAverage = () => (feedback.good - feedback.bad) / (feedback.good + feedback.neutral + feedback.bad)
  const calculatePositive = () => feedback.good / (feedback.good + feedback.neutral + feedback.bad) * 100

  if (feedback.good === 0 && feedback.neutral === 0 && feedback.bad === 0) {
    return (
      <div>
        <h1>{statsHeader}</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <>
      <h1>{statsHeader}</h1>
      <table>
        <tbody>
          <StatisticLine text="good: " value={feedback.good} />
          <StatisticLine text="neutral: " value={feedback.neutral} />
          <StatisticLine text="bad: " value={feedback.bad} />
          <StatisticLine text="all: " value={calculateAll()} />
          <StatisticLine text="average: " value={calculateAverage()} />
          <StatisticLine text="positive: " value={calculatePositive()} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const header = "give feedback";
  const statsHeader = "statistics"

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGoodClick = () =>
    setFeedback({ ...feedback, good: feedback.good + 1, all: feedback.all + 1 })

  const handleNeutralClick = () =>
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 })

  const handleBadClick = () =>
    setFeedback({ ...feedback, bad: feedback.bad + 1, all: feedback.all - 1 })

  return (
    <>
      <Header course={header} />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Statistics statsHeader={statsHeader} feedback={feedback} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))