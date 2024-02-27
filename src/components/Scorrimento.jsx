import Carousel from 'react-bootstrap/Carousel';
import '../css/Scorrimento.css';

function Scorrimento() {
  return (
    <Carousel className="custom-carousel">
      <Carousel.Item interval={2000}>
        <img src="src/assets/hallway.jpg"/>
        <Carousel.Caption className='custom-caption'>
          <h3>Naviga nel Mondo Medico</h3>
          <p>Dove la cura incontra l'innovazione, la nostra clinica è la tua risposta.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src="src/assets/medical.jpg"/>
        <Carousel.Caption className='custom-caption'>
          <h3>Passione per la Cura, Ogni Giorno.</h3>
          <p>Alla ricerca costante di soluzioni mediche avanzate per il tuo benessere.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src="src/assets/equipment.jpg"/>
        <Carousel.Caption className='custom-caption'>
          <h3>Il Futuro della Medicina</h3>
          <p>
          Sempre un passo avanti nella gestione della tua pratica medica.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Scorrimento;