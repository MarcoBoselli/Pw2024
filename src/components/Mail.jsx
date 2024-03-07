import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { Form } from 'react-bootstrap';

function Mail(mail) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendEmail = async () => {

    const sendMail = document.getElementById('mail').value;
    const contentMail = document.getElementById('contenuto').value;

    try {
      const response = await fetch('https://wpschool.it/clinica/boselli/api/email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sendMail, contentMail }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert('mail inviata con successo');
        handleClose();
      } else {
        const errorResult = await response.json();
        console.error(errorResult.message);
        alert('errore invio mail');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Contatta
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invia una mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Label htmlFor="mail" visuallyHidden>
          Mail
        </Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text>Mail</InputGroup.Text>
          <Form.Control id="mail" defaultValue={mail.mail}/>
        </InputGroup>

        <Form.Label htmlFor="contenuto" visuallyHidden>
          Contenuto
        </Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text>Contenuto</InputGroup.Text>
          <Form.Control as='textarea' id="contenuto" defaultValue={''}/>
        </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant='success' onClick={() => { sendEmail('marcoboselli889@gmail.com') }}>
            Invia
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Mail;