const Header = (props) => {
  return (
    <div>
      <h1>{props.name.name}</h1>
    </div>
  )
}

const Content = (props) => {
  props = props.parts.parts
  return (
    <>
      <Part name={props[0].name} exercise={props[0].exercises} />
      <Part name={props[1].name} exercise={props[1].exercises} />
      <Part name={props[2].name} exercise={props[2].exercises} />
    </>
  )

}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercise}
      </p>
    </>
  )
}

const Total = (props) => {
  props = props.parts.parts;
  return (
    <>
      <p>Number of exercises {props[0].exercises + props[1].exercises + props[2].exercises}</p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div >
  )
}

export default App