import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Col} from 'react-bootstrap';
import QRCode from 'react-qr-code';
import { jsPDF } from 'jspdf';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import {Table} from 'react-bootstrap';

function Dettaglio() {
  const { cf } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [visitData, setVisitData] = useState(null);
  const navigate = useNavigate();

  useEffect ( () => {
    fetch('https://wpschool.it/clinica/boselli/api/dettaglio.php?codice_fiscale=' + cf)
      .then(response => response.json())
      .then(data => {
        setPatientData(data.patientData);
        setVisitData(data.visitData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [cf]);

  const generatePDF = () => {
    const doc = new jsPDF();

    if (patientData && patientData.length > 0) {
        doc.text(`Nome: ${patientData[0].nome}`, 10, 10);
        doc.text(`Cognome: ${patientData[0].cognome}`, 10, 20);
        doc.text(`Data di nascita: ${patientData[0].data_n}`, 10, 30);
        doc.text(`CF: ${patientData[0].codice_fiscale}`, 10, 40);
        doc.text(`Email: ${patientData[0].email}`, 10, 50);
        doc.text(`Telefono: ${patientData[0].telefono}`, 10, 60);
  
    
        const maxWidth = 180; 
        const lineHeight = 10; 

        visitData.forEach((visit, index) => {
            const startY = 90;
            const startX = 10;
            const yOffset = startY + (index * 50); 

            doc.text(`Visita ${index + 1}`, startX, yOffset);
            doc.text(`Data: ${visit.data}`, startX, yOffset + lineHeight);

            if (visit.referto) {
                const words = doc.splitTextToSize(visit.referto, maxWidth);
                doc.text(words, startX, yOffset + lineHeight * 2);
            }
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        doc.save();

        window.open(pdfUrl, '_blank')
    }
  };
  


  return (
    <>
      

      <Card>
        <Card.Header>
          <Card.Title>{patientData ? patientData[0].nome + ' ' + patientData[0].cognome : ''}</Card.Title>
        </Card.Header>
        <Card.Body >
          {patientData && patientData.length > 0 ? (
            <div className='d-flex flex-column'>
                <Col style={{margin : '20px'}}>
                <Card.Text>Data di nascita: {patientData[0].data_n}</Card.Text>
                <Card.Text>Codice fiscale: {patientData[0].codice_fiscale}</Card.Text>
                <Card.Text>Email: {patientData[0].email}</Card.Text>
                <Card.Text>Telefono: {patientData[0].telefono}</Card.Text>
                </Col>

                {visitData.length > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Referto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitData.map((visit, index) => (
                      <tr key={index}>
                        <td>{visit.data}</td>
                        <td>{visit.referto}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
                <div >
                <QRCode value={'https://react-bootstrap.netlify.app/docs/components/cards/'} />
            
                <Button style={{margin: '15px'}} variant="primary" onClick={generatePDF}>
                    Genera PDF
                </Button>
                </div>
              
            </div>
          ) : (
            <div className='flex-row'>
              <Spinner animation="border" />
              <p>Caricamento...</p>
            </div>
          )}
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary" onClick={() => {navigate('/pazienti')}}>
            Visializza pazienti
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Dettaglio;
