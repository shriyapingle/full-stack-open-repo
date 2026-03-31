import { useState } from 'react'
import Button from './Button'
import Display from './Display'

const Statistics = ({ props }) => {
  if (props.length === 0) {
    return <div>No feedback given</div>
  } else {


    const list = props.map((e,i) => <StatisticLine name={e.name} value={e.value} key={i} />)
    return <table><tbody>{list}</tbody></table>

  }


}

const StatisticLine = ({ name, value }) => {
  if (name == 'Positive' && value > 0) {
    return (
      <tr>
        <td>{name}</td><td>{Number.isInteger(value) ? value : Number.parseFloat(value).toFixed(1)} %</td>
      </tr>
    )
  }
  return <tr><td>{name}</td><td>{Number.isInteger(value) ? value : Number.parseFloat(value).toFixed(1)}</td></tr>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivePercent, setPositivePercent] = useState(0)
  const [statsArray, setStatsArray] = useState([])
  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    handleStatistics(updatedGood, neutral, bad)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    handleStatistics(good, updatedNeutral, bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    handleStatistics(good, neutral, updatedBad)
  }

  const handleStatistics = (statGood, statNeutral, statBad) => {
    const statTotal = statBad + statGood + statNeutral
    setTotal(statTotal)
    const statAverage = ((statGood * 1) + (statBad * -1)) / statTotal
    setAverage(statAverage)
    const statPositive = (statGood / statTotal) * 100
    setPositivePercent(statPositive)

    let statArray = [
      {
        name: 'Good',
        value: statGood
      },
      {
        name: 'Neutral',
        value: statNeutral
      },
      {
        name: 'Bad',
        value: statBad
      },
      {
        name: 'All',
        value: statTotal
      },
      {
        name: 'Average',
        value: statAverage
      },
      {
        name: 'Positive',
        value: statPositive
      }
    ]
    setStatsArray(statArray)

  }

  return (
    <div>

      <Display text="Give Feedback" />
      <br></br>
      <div>
        <Button onClick={handleGood} text="Good" /> {' '}
        <Button onClick={handleNeutral} text="Netutral" /> {' '}
        <Button onClick={handleBad} text="Bad" />
      </div>
      <br></br>
      <br></br>
      <Display text="Statistics" />
      <br></br>
      <Statistics props={statsArray} />

    </div>
  )
}

export default App