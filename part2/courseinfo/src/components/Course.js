const Header = (props) => {
    return (
      <h1>{props.courseName}</h1>
    )
  }
  const Part = (props) => {
    const { name, exercises } = props.part;
    return (
      <p>
          {name} {exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        { parts.map(p => <Part key={p.id} part={p}/>) }
      </>
    )
  }
  
  const Total = (props) => {
    const totalParts = props.parts.reduce((accumulator, currentPart) => accumulator + currentPart.exercises, 0)
  
    return (
      <b>total of {totalParts} exercises</b>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }

  export default Course;