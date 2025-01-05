import React from 'react'
import {Navbar,Container} from 'react-bootstrap'

function NavigationBar() {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>
            <b>Logistic</b>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
