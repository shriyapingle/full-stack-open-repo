const Display = ({props}) => {
    
    if(Number.isInteger(props)) {
        return <div>has {props} votes</div>
    }
    return <div>{props}</div>

}
export default Display