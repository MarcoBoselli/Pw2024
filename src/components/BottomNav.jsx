import { Container, Navbar } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

function BottomNav() {
  return (
    <Navbar fixed="bottom" className="bg-light">
      <Row style={{width: '100%'}}>
        <Col>
        <div>
          <p>
          C.F. 97088810581 - P.I. 04970461002 
          </p>
          <p>
          Viale Regina Margherita 278 - 00198 Roma
          </p>
        </div>
        </Col>
        <Col>
        <div>
          <p>
          +39 555 0827512
          </p>
          <p>
          clinicarossi@gmail.com
          </p>
        </div>
        </Col>
      </Row>
    </Navbar>
  );
}

export default BottomNav;