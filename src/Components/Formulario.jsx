import { useState } from "react";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import ClimaResultado from "./ClimaResultado";

const Formulario = () => {
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [clima, setClima] = useState(null);
  const API_KEY = "b120c0783142e16b1ff6fedf75f0b845";
      const mostrarComponente = () => {
        if (mostrarSpinner) {
          return (
            <div className="d-flex justify-content-center my-5">
              <Spinner animation="border" variant="light" className="my-4" />
            </div>
          );
        } else if (clima === null) {
          return null; 
        } else if (clima.error) {
          return <h3 className="text-center mb-5 text-white transparente p-3 rounded-4 align-self-center">{clima.error}</h3>;
        } else {
          return <ClimaResultado clima={clima} />;
        }
      };
  
  const consultarApi=async()=>{
    try{
      setMostrarSpinner(true)
      const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.trim()},${pais.trim()}&appid=${API_KEY}&units=metric&lang=es`);
      const respuestaData = await respuesta.json();
      if (respuesta.ok){
        setClima(respuestaData);
      }else {
        setClima({ error: "No se encontraron datos para la ciudad ingresada." });
      }      
    }catch{
      console.error("Error al consultar la API:", error);
      setClima({ error: "Error al obtener datos climáticos. Inténtalo nuevamente." });
    } finally {
    setMostrarSpinner(false);
    }
  }
  const handleConsultaClima = (e) => {
    e.preventDefault()
    consultarApi()
  }

  
  return (
    <Form onSubmit={handleConsultaClima} className='d-flex flex-column align-content-center flex-lg-row justify-content-lg-around' >
      <div className="my-5 mx-2 text-white">
      <Row>
        <Col md={3}>
            <Form.Label>Ingrese ubicación: </Form.Label>
        </Col>
        <Col md={9}>

            <Form.Control
            required
            minlength="4"
            maxlength="40"
            type="text"
            value={ciudad}
            placeholder="Ej: San Miguel de Tucuman"
            onChange={(e) => setCiudad(e.target.value)}
            />
        </Col>
        <Col md={3} className="my-3">
            <Form.Label>Ingrese país: </Form.Label>
        </Col>
        <Col md={9}  className="my-3">

            <Form.Control
            required
            minlength="4"
            maxlength="40"
            type="text"
            placeholder="Ej: Argentina"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            />
        </Col>
      </Row>
      <div className="text-end">
        <Button type="submit" className="text-end">
          Buscar
        </Button>
      </div>

      </div>
      

      {mostrarComponente()}
    </Form>
  );
};

export default Formulario;
