const Search = ({ onChange }) => {
    return (
        <form>
            Filter shown with <input placeholder='Search Name' name='search' onChange={onChange} />
        </form>
    )
}
export default Search