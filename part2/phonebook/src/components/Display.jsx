const Display = ({ props }) => Array.isArray(props)?props.map((name, id) => <div key={id}>{name.name} {name.number}</div>):<div>{props}</div>
  
export default Display