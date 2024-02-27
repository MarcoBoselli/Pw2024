import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../css/Clienti.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function MyTable({props}) {

  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = sessionStorage.getItem('token');

    if (token) {

      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
      });

      fetch('https://wpschool.it/clinica/boselli/api/token.php', {
        method: 'GET',
        headers,
      })
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);
          
          fetch('https://wpschool.it/clinica/boselli/api/'+props+'.php')
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching data:', error));

        })
        .catch(error => {
          console.error('API Error:', error);
          navigate('/')
        });
    } 
    else 
      navigate('/login');
  }, [props]);

  const sendEmail = async (recipientEmail) => {
    try {
      const response = await fetch('https://wpschool.it/clinica/boselli/api/email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientEmail }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        const errorResult = await response.json();
        console.error(errorResult.message);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const generateTableHeaders = () => {
    if (patients.length === 0) return [];

    const firstPatient = patients[0];
    return Object.keys(firstPatient);
  };

  return (
    <>
      
      <h3 className="mb-5">Elenco {props != 'contattare'? props : 'pazienti da contattare' }</h3>
      { patients.length == 0 ? (
        <Alert key='danger' variant='danger'>
          Nessun elemento è stato trovato!
        </Alert>
        ) :
       <Table striped className="tab-width">
        <thead>
          <tr>
            {generateTableHeaders().map(header => (
              <th key={header} className="tab-width">
                {header}
              </th>
            ))}
            {props == 'pazienti' || props == 'contattare' ? (<th className="tab-width"></th>) : ''}
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.codice_fiscale}>
              {generateTableHeaders().map(header => (
                <td key={header}>{patient[header]}</td>
              ))}
              {props === 'pazienti' && (
                <td>
                  <Button variant='success' onClick={() => {navigate('/dettaglio/'+patient.codice_fiscale)}} >
                    Dettagli
                  </Button>
                </td>
              )}
              {props === 'contattare' && (
                <td>
                  <Button variant='warning' onClick={() => { sendEmail(patient.mail) }}>
                    Contatta
                  </Button>
                </td>
              )}
              
            </tr>
          ))}
        </tbody>
      </Table>
      }
    
    </>
  );

}

export default MyTable