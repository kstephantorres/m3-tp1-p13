import { Container } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Formulario from './Components/Formulario'
import { useEffect, useState } from 'react'
import ClimaResultado from './Components/ClimaResultado'

function App() {

  return (
    <Container >
      <Formulario></Formulario>
    </Container>
  )
}

export default App
