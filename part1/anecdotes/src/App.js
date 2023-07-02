import { useState } from 'react'
const Header = ({text}) => <h1>{text}</h1>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const nextQuote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  const vote = () => {
    const copy = [...votes]
    let updatedNumVotes = copy[selected] + 1
    copy[selected] = updatedNumVotes
    setVotes(copy)
    if (updatedNumVotes > mostVotes) {
      setMostVotes(updatedNumVotes)
    }
  }
  return (
    <>
      <Header text="Anecdote of the day"/>
      <div>
        {anecdotes[selected]}
      </div>
      <Button text="vote" handleClick={vote}/>
      <Button text="next anecdote" handleClick={nextQuote}/>
      <div>
        has {votes[selected]} votes
      </div>
      <Header text="Anecdote with most votes"/>
      <div>
        {anecdotes[votes.indexOf(mostVotes)]}
      </div>
    </>
  )
}

export default App