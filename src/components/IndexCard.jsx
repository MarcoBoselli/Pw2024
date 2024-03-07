import Card from 'react-bootstrap/Card';

function IndexCard() {
  return (
    <Card className='index-card' style={{ width: '18rem' }}>
      <Card.Body>
        <img style={{width: '-webkit-fill-available'}} src='https://wpschool.it/clinica/clinica-Boselli/img/users.png'></img>
        <Card.Title>Personale qualificato</Card.Title>
        <Card.Text>
            Il nostro team di professionisti altamente qualificati è dedicato a fornire servizi di eccellenza, 
            garantendo un'esperienza affidabile e competente in ogni aspetto delle nostre attività.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default IndexCard;