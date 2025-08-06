import { useState } from 'react';

const Header = ({ header }) => <h2>{header}</h2>;

const Button = ({ onClick, text }) => <button onClick={onClick}> {text}</button>;

const StatisticLine = ({ text, value, suffix }) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}{suffix ? `${suffix}` : ''}</td>
  </tr>
  )
};

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>
  };

  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={props.all} />
      <StatisticLine text='average' value={(props.score / props.all)} />
      <StatisticLine text='positive' value={(props.good / props.all) * 100} suffix='%' />
      </tbody>
    </table>
  )
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [score, setScore] = useState(0);

  // event handlers
  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setScore(score + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setScore(score - 1);
  };

  return (
    <div>
      <Header header='give feedback' />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header header='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} score={score} all={all} />
    </div>
  )
};

export default App