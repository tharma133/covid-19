import { useState, useEffect } from 'react'
import Info from './Info'
import './info.css'
import './index.css'
import Table from './Table'
import { sortData } from './utils'
import LineGraph from './LineGraph'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState([])
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState('cases')
  const getCountries = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries')
    const data = await response.json()
    const names = data.map((country) => {
      return {
        name: country.country,
        value: country.countryInfo.iso2,
      }
    })
    const sortedData = sortData(data)
    setTableData(sortedData)
    setCountries(names)
  }

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    getCountries()
  }, [countries])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
  }
  return (
    <div className='app'>
      <div className='left'>
        <div className='header'>
          <h1 className='title'>Covid-19 Tracker</h1>
          <select
            className='dropdown'
            onChange={onCountryChange}
            value={country}
          >
            <option value='worldwide'>WorldWide</option>
            {countries.map((country, index) => {
              return (
                <option key={index} value={country.value}>
                  {country.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className='app-info'>
          <Info
            color='yellow'
            onClick={(e) => setCasesType('cases')}
            isRed
            active={casesType === 'cases'}
            title='Cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <Info
            color='green'
            onClick={(e) => setCasesType('recovered')}
            title='Recovered'
            active={casesType === 'recovered'}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <Info
            onClick={(e) => setCasesType('deaths')}
            color='red'
            title='Deaths'
            isRed
            active={casesType === 'deaths'}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <div className='line'>
          <LineGraph casesType={casesType} />
        </div>
      </div>
      <div className='right'>
        <h3>Live cases by country</h3>
        <Table countries={tableData} />
      </div>
    </div>
  )
}

export default App
