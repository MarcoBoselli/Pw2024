import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { Form } from 'react-bootstrap';

function ModificaVisita(visita){

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Modifica = async () => {

    const id_visita = visita.visita.id;
    const data_visita = document.getElementById('data_visita').value;
    const referto = document.getElementById('referto').value;

    try {
        const response = await fetch('https://wpschool.it/clinica/clinica-Boselli/api/modificaVisita.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_visita, data_visita, referto}),
        });
    
          const result = await response.json();
          console.log(result.message);
          window.location.reload();
      } catch (error) {
        console.error('Errore nella modifica:', error);
      }

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modifica
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica visita</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <Form.Label htmlFor="data_visita" visuallyHidden>
          Data
        </Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text>Data</InputGroup.Text>
          <Form.Control id="data_visita" type='date' defaultValue={visita.visita.data}/>
        </InputGroup>

        <Form.Label htmlFor="referto" visuallyHidden>
          Referto
        </Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text>Referto</InputGroup.Text>
          <Form.Control as='textarea' id="referto" defaultValue={visita.visita.referto}/>
        </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="success" onClick={() =>{Modifica()}}>
            Effettua modifica
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default ModificaVisita;