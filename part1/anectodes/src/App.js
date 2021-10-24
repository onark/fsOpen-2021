import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const totalAnectodes = anecdotes.length;
  const [votes, setVotes] = useState(Array(totalAnectodes).fill(0))

  const selectRandom = () => {
    const randomIndex = Math.floor(Math.random() * totalAnectodes);
    setSelected(randomIndex)
  };

  const vote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const HasVotes = (props) => {
    return (
      <div>
        has {props.votes} votes
      </div>
    )
  }

  return (
    <div>
      <h1> Anectode of the day</h1>
      {anecdotes[selected]}
      <HasVotes votes={votes[selected]}/>
      <div>
        <button onClick={vote}>Vote</button>
        <span>----</span>
        <button onClick={selectRandom}> Next Random Anectode</button>
      </div>
      <h1>Most voted anectode</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <HasVotes votes={Math.max(...votes)}/>
    </div>
  )
}

export default App