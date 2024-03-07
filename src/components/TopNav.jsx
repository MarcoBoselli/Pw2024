import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TopNav(){

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = sessionStorage.getItem('token');
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  } 

    return (
      <>

        <Navbar fixed='top' bg="primary" >
          <Row style={{width: '100%'}}>
          <Col>
            <Button variant="dark" onClick={handleShow} className='m-2'>
              Naviga
            </Button>
          </Col>
          { token && (<Col>
            <Button variant="danger" onClick={handleLogout} className='m-2'>
              Logout
            </Button>
          </Col>)}
          <Col><h1 style={{color: 'white'}} className='m-2'>Clinica Dott. Rossi</h1></Col>
          </Row>
        </Navbar>
        
        
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
          <Offcanvas.Title>Naviga</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            
              <Container>

                <Nav className="me-auto">
                  <ListGroup variant='flush'>
                    <ListGroup.Item><Nav.Link href="/">Home</Nav.Link></ListGroup.Item>
                    <ListGroup.Item><Nav.Link href="/login">Login</Nav.Link></ListGroup.Item>
                    <ListGroup.Item><Nav.Link href="/pazienti">Pazienti</Nav.Link></ListGroup.Item>
                    <ListGroup.Item> <Nav.Link href="/visite">Visite</Nav.Link></ListGroup.Item>
                    <ListGroup.Item><Nav.Link href="/contattare">Pazienti da contattare</Nav.Link></ListGroup.Item>
                    <ListGroup.Item><Nav.Link href="/inserisci-pazienti">Inserisci un paziente</Nav.Link></ListGroup.Item>
                    <ListGroup.Item><Nav.Link href="/inserisci-referto">Inserisci un referto</Nav.Link></ListGroup.Item>
                  </ListGroup>
                </Nav>
              </Container>
           
          </Offcanvas.Body>
        </Offcanvas>
        
      </>

      )
}

export default TopNav