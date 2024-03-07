import { Container, Navbar } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

function BottomNav() {
  return (
    <Navbar fixed="bottom" className="bg-light">
      <Row style={{width: '100%'}}>
        <Col>
        <div>
          <p>
          C.F. 9705550581 - P.I. 0497555002 
          </p>
          <p>
          Via G. Matteotti, 26 - Sermide (MN) 46028
          </p>
        </div>
        </Col>
        <Col>
        <div>
          <p>
          +39 555 0827512
          </p>
          <p>
          clinica.rossi.info@gmail.com
          </p>
        </div>
        </Col>
      </Row>
    </Navbar>
  );
}

export default BottomNav;