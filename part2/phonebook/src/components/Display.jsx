const Display = ({props,onClick}) => {
    
    return (
        <div>
            {Array.isArray(props) ? props.map((name, id) => <div key={id}>{name.name} {name.number}  <button id={name.id} onClick={onClick}>Delete</button></div>) :<div>{props}</div>}
        </div>
    )

}

export default Display