import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import './info.css'
function Info({ title, color, cases, total, active, isRed, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--red'
      }`}
    >
      <CardContent>
        <h1 className={`${color}`}>{title}</h1>
        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
          today cases: {cases}
        </h2>
        <h3 className='infoBox__total'>total cases:{total}</h3>
      </CardContent>
    </Card>
  )
}

export default Info
