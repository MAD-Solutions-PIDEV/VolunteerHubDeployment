import React from 'react'
import Wheel from './Wheel'
import { Col, Row } from 'react-bootstrap'
import Header from 'components/Header/Header'

function Winner() {
  return (<>
    <Header />
    <div style={{
      height:"50rem",
      backgroundPosition: "bottom",
      backgroundImage:'url("https://i.pinimg.com/originals/d0/09/67/d009678eb5b1658468704f51bfc11173.gif")'
    }}>
    <Wheel />
    </div>
    </>
  )
}

export default Winner