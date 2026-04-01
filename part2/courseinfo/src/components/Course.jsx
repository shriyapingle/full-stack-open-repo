const CourseDetails = ({course}) => {
    console.log(course)
    const courseParts = course.parts
    return (
        <div>
            <h3>{course.name}</h3>
            <div>{courseParts.map(exe=><div key={exe.id}>{exe.name} {exe.exercises}</div>)}</div>
            <div>total of {courseParts.reduce((sum,exer)=>{return sum+exer.exercises},0)} exercises</div>
        </div>
    )
}


const Course = ({ course }) => {
    console.log(course)
    course.map(ele => console.log(ele.name))
    // const courseDetails = course.map(ele => <h1>{ele.name}</h1>)
    return (
        <div>
            <h1> Web development curriculum</h1>
            <div>{course.map(ele => <CourseDetails course={ele} key={ele.id}/>)}</div>
        </div>
    )
}

export default Course