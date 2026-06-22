const CountryList = ({ countryList, onClick }) => {
    console.log(countryList);
    const countries = countryList.map(country => (country.name.common));
    console.log(countries);
    return (
        <div>
            {countries.map(country => <li key={countries.indexOf(country)}>{country} <button id={countries.indexOf(country)} onClick={onClick}>Show</button></li>)}
        </div>
    )
}

export default CountryList