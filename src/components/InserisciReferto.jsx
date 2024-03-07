import { Button, Col, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAuth } from '../hooks/Auth';

function inserisciReferto(){

    const navigate = useNavigate();
    const [pazienti, setPazienti] = useState([]);

    useEffect(() => {

        checkAuth().then(isAuthenticated => {
            if (!isAuthenticated) {
                navigate('/login');
            }

        fetch('https://wpschool.it/clinica/clinica-Boselli/api/pazienti.php')
            .then(response => response.json())
            .then(data => setPazienti(data))
            .catch(error => console.error('Error fetching data:', error));
        });
    }, []);

    const Registra = async () => {
        const data_visita = document.getElementById('data_visita').value;
        const referto = document.getElementById('referto').value;
        const id_paziente = document.getElementById('id_paziente').value;
    
        const postData = {
            data_visita,
            referto,
            id_paziente,
        };
    
        try {
            const response = await fetch('https://wpschool.it/clinica/clinica-Boselli/api/registraReferto.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
    
            const data = await response.json();
    
            if (data.message) {
                alert(data.message);
                navigate('/');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            alert('Errore durante la richiesta al server');
        }
    };

    return(
        <>
        {
         pazienti.length !== 0 ? (
        <Card>
        <Card.Header>Registra un referto o prenota una nuova visita</Card.Header>
        <Card.Body>
        <Form>
        <Row className="align-items-center">
            <Col xs="auto" style={{width : '70%'}}>
            <Form.Label htmlFor="data_visita" visuallyHidden>
                Data
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>Data</InputGroup.Text>
                <Form.Control type='date' id="data_visita"/>
            </InputGroup>
            </Col>

        </Row>

        <Row>

            <Col xs="auto" style={{ width: '100%' }}>
                <Form.Label htmlFor="referto" visuallyHidden>
                    Referto
                </Form.Label>
                <InputGroup className="mb-2">
                    <InputGroup.Text>Referto</InputGroup.Text>
                    <Form.Control as="textarea" id="referto" rows={3} />
                </InputGroup>
            </Col>
        </Row>
        
        <Row>
            <Col xs="auto" style={{ width: '100%' }}>
                <Form.Select id='id_paziente' aria-label="Default select example">
                    {pazienti.map((paziente) => (
                        <option key={paziente.codice_fiscale} value={paziente.codice_fiscale}>
                            {paziente.nome + ' ' + paziente.cognome + ' ' + paziente.codice_fiscale}
                        </option>
                    ))}
                </Form.Select>
            </Col>

        </Row>
        </Form>
        <Button style={{marginTop:'5%'}} variant="primary" onClick={() =>{Registra()}}>Registra</Button>
        </Card.Body>
        </Card>
    ) : (<></>)}
    </>
    );

}

export default inserisciReferto;