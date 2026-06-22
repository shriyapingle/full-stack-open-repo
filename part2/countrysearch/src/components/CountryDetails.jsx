const CountryDetails = ({ country }) => {
    console.log(country);
    const languages = Object.keys(country.languages).map((key) => country.languages[key])
    return (
        <div>
            <h1>{country.name.common}</h1>
            <li>Capital: {country.capital}</li>
            <li>Area: {country.area}</li>
            <h2>Languages</h2>
            <ul>{Array.isArray(languages) ? languages.map(lang => <li key={lang}>{lang}</li>) : <li>{languages}</li>}</ul>
            <img className="fit-picture"
                src={country.flags.png}
                alt={country.flags.alt}></img>
        </div>
    )
}

export default CountryDetails