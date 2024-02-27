import { Button, Col, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const username = document.getElementById('user').value;
      const password = document.getElementById('password').value;
  
      const response = await fetch('https://wpschool.it/clinica/boselli/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        sessionStorage.setItem('token', data.token);
        alert('Login effettuato con successo');
        navigate('/');
      } else {
        alert('Credenziali errate');
      }
    } catch (error) {
      alert('Errore nella fase di login');
    }
  };

  return (
    <Card>
    <Card.Header>Esegui il Login</Card.Header>
    <Card.Body>
      <Form>
      <Row className="align-items-center">
      <Col xs="auto">
          <Form.Label htmlFor="user" visuallyHidden>
            Username
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text>Username</InputGroup.Text>
            <Form.Control id="user"/>
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="password" visuallyHidden>
            Password
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text>Password</InputGroup.Text>
            <Form.Control type="password" id="password"/>
          </InputGroup>
        </Col>
      </Row>
    </Form>
      <Button variant="primary" onClick={handleLogin}>Accedi</Button>
    </Card.Body>
  </Card>
  );
}

export default Login;