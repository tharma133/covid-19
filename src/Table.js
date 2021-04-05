import React from 'react'
import './Table.css'
function Table({ countries }) {
  return (
    <div className='table'>
      {countries.map((country, index) => {
        return (
          <div key={index}>
            <h4>{country.country}</h4>
            <h4>
              <strong>{country.cases}</strong>
            </h4>
          </div>
        )
      })}
    </div>
  )
}

export default Table
