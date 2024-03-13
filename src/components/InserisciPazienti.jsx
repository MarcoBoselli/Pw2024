import { Button, Col, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAuth } from '../hooks/Auth';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';

function InserisciPazienti() {

    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        checkAuth().then(isAuthenticated => {
            if (isAuthenticated) {
                setAuth(true)
            }
        })
    },[]);

    const Registra = async () =>{

        const mail = document.getElementById('mail').value;
        const telefono = document.getElementById('telefono').value;
        const cf = document.getElementById('cf').value;
        const nome = document.getElementById('nome').value;
        const cognome = document.getElementById('cognome').value;
        const data_n = document.getElementById('data_n').value;

        const response = await fetch('https://wpschool.it/clinica/clinica-Boselli/api/registraPaziente.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, telefono, cf, nome, cognome, data_n }),
      });

      const data = await response.json();

      if(data.message){
        alert(data.message);
        navigate('/');
      }
      else{
        alert('Errore nella fase di registrazione');
      }

    }

    if(auth){
    
    return (
    <Card>
        <Card.Header>Registra un nuovo paziente</Card.Header>
        <Card.Body>
        <Form>
        <Row className="align-items-center">
        <Col xs="auto" style={{width : '50%'}}>
            <Form.Label htmlFor="nome" visuallyHidden>
                Nome
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>Nome</InputGroup.Text>
                <Form.Control id="nome"/>
            </InputGroup>
            </Col>

            <Col xs="auto" style={{width : '50%'}}>
            <Form.Label htmlFor="cognome" visuallyHidden>
                Cognome
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>Cognome</InputGroup.Text>
                <Form.Control id="cognome"/>
            </InputGroup>
            </Col>

        </Row>
        <Row>
            <Col xs="auto" style={{width : '50%'}}>
            <Form.Label htmlFor="data_n" visuallyHidden>
                Data di nascita
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>Data di nascita</InputGroup.Text>
                <Form.Control type='date' id="data_n"/>
            </InputGroup>
            </Col>

            <Col xs="auto" style={{width : '50%'}}>
            <Form.Label htmlFor="cf" visuallyHidden>
                Codice fiscale
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>Codice fiscale</InputGroup.Text>
                <Form.Control type='text' id="cf"/>
            </InputGroup>
            </Col>
        </Row>
        <Row>
            <Col xs="auto" style={{width : '50%'}}>
            <Form.Label htmlFor="telefono" visuallyHidden>
                Telefono
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>Telefono</InputGroup.Text>
                <Form.Control type='number' id="telefono"/>
            </InputGroup>
            </Col>

            <Col xs="auto" style={{width : '50%'}}>
            <Form.Label htmlFor="mail" visuallyHidden>
                Mail
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>Mail</InputGroup.Text>
                <Form.Control type='text' id="mail"/>
            </InputGroup>
            </Col>
        </Row>
        </Form>
        <Button variant="primary" onClick={() =>{Registra()}}>Registra</Button>
        </Card.Body>
    </Card>

    );
        
}
else{
    return(
        <Alert key='danger' variant='danger'>
          Effettua il login per accedere alla pagina!
        </Alert>
    );
}

}

export default InserisciPazienti;