import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavigationBar'

function Request() {
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault()
    navigate("/system-request/dasboard")
  }

  return (
    <>
      <NavBar/>

      <Container>
        <h2 className="text-center mb-4">Request Pickup Part Import</h2>
        <Card className="shadow mx-auto" style={{ maxWidth: "600px" }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="partName" className="mb-3">
                <Form.Label>Part name:</Form.Label>
                <Form.Control type="text" placeholder="Enter part name" />
              </Form.Group>

              <Form.Group controlId="quantity" className="mb-3">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control type="number" placeholder="Enter amount" />
              </Form.Group>

              <Form.Group controlId="dimensions" className="mb-3">
                <Form.Label>Dimension (Length, Width, Height):</Form.Label>
                <Row>
                  <Col>
                    <Form.Control type="number" placeholder="Length" />
                  </Col>
                  <Col>
                    <Form.Control type="number" placeholder="Width" />
                  </Col>
                  <Col>
                    <Form.Control type="number" placeholder="Height" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="weight" className="mb-3">
                <Form.Label>Weight:</Form.Label>
                <Form.Control type="text" placeholder="Enter weight" />
              </Form.Group>

              <Form.Group controlId="pickupAddress" className="mb-3">
                <Form.Label>Pickup address:</Form.Label>
                <Form.Control type="text" placeholder="Enter address" />
              </Form.Group>

              <Form.Group controlId="destinationAddress" className="mb-3">
                <Form.Label>Destination address:</Form.Label>
                <Form.Select>
                  <option>Choose</option>
                  <option>Jakarta</option>
                  <option>Surabaya</option>
                  <option>Bandung</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="pickupDate" className="mb-3">
                <Form.Label>Pickup date:</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group controlId="supplierName" className="mb-3">
                <Form.Label>Supplier name:</Form.Label>
                <Form.Control type="text" placeholder="Enter supplier name" />
              </Form.Group>

              <Form.Group controlId="requesterName" className="mb-3">
                <Form.Label>Requester name:</Form.Label>
                <Form.Control type="text" placeholder="Enter requester name" />
              </Form.Group>

              <Form.Group controlId="documentImport" className="mb-3">
                <Form.Label>Dokument import (Packing List, Commercial Invoice):</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Form.Group controlId="options" className="mb-4">
                <Form.Label>Options:</Form.Label>
                <Form.Select>
                  <option>Choose</option>
                  <option>Air</option>
                  <option>Sea</option>
                </Form.Select>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Submit Request
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <footer className="text-center mt-4">
          <p>&copy; 2025 Maka Logistic</p>
        </footer>
      </Container>
    </>
  );
}

export default Request;
