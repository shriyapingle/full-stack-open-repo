const AddNewContact = ({onSubmit,nameValue,numberValue,onNameChange,onNumberChange}) => {
    return (
        <form onSubmit={onSubmit}>
            Name: <input value={nameValue} placeholder='Contact Name' onChange={onNameChange} /> <br></br>
            Number: <input value={numberValue} placeholder='Contact Number' onChange={onNumberChange} /><br></br>
            <button type="submit">add</button>
        </form>
    )
}
export default AddNewContact