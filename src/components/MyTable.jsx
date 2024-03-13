import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../css/Tabella.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Mail from './Mail';
import ModificaVisita from './ModificaVisita';
import { checkAuth } from '../hooks/Auth';
import { DeleteVisita } from '../hooks/DeleteVisita';

function MyTable({props}) {

  const [patients, setPatients] = useState([]);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth().then(isAuthenticated => {
        if (isAuthenticated) {
            setAuth(true);
        }

        fetch(`https://wpschool.it/clinica/clinica-Boselli/api/${props}.php`)
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching data:', error));
    });
}, [props, patients]);

  

  const generateTableHeaders = () => {
    if (patients.length === 0) return [];

    const firstPatient = patients[0];
    return Object.keys(firstPatient);
  };

  if(auth){

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
            <th className="tab-width"></th>
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
                  <Mail mail={patient.email}/>
                </td>
              )}
              {props === 'visite' && (
                <td>
                  <ModificaVisita visita={patient}/>
                  <Button variant='danger' style={{marginLeft : '10px'}} onClick={() => {
                    DeleteVisita(patient.id);
                  }}>Elimina</Button>
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
else{
  return(
    <Alert key='danger' variant='danger'>
      Effettua il login per accedere alla pagina!
    </Alert>
  );
}

}

export default MyTable