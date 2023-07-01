import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}
const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + bad + neutral;
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const average = (good - bad) / all;
  const positive = (good/all) * 100 + ' %';
  return (
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
        </tbody>
       
      </table>
      
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      
      <Header text="give feedback"/>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App