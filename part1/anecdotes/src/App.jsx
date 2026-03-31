import { useState } from 'react'
import Button from './Button'
import Display from './Display'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(8).fill(0))

  const handleClick = () => { 
    let randomNumber = Math.floor(Math.random()*8)
    setSelected(randomNumber)
  }
  const handleVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] +=1
    setVote(copyVotes)
    console.log(copyVotes)
  }

  return (
    <div>
      <Display props="Anecdote of the day"/>
      <br></br>
      <Display props={anecdotes[selected]} />
      <Display props={votes[selected]}/>
      
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleClick} text="Next anecdote" />

      <br></br>
      <br></br>
      <Display props="Anecdote with most votes"/>
      <Display props={anecdotes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

export default App