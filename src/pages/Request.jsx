import { Container, Row, Col, Button, Card } from "react-bootstrap";
import logo from "../assets/maka-logo.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Request() {
  return (
    <>
      <Container
        fluid
        className="vh-100 d-flex flex-column p-0"
        style={{ background: "#f3f6fa" }}
      >
        <section
          style={{ flex: 1 }}
          className="d-flex align-items-center justify-content-center px-3"
        >
          <Card
            className="shadow-lg rounded-4"
            style={{
              border: "none",
            }}
          >
            <Card.Body>
              <div className="text-center mb-3">
                <img
                  src={logo}
                  alt="Maka Logo"
                  style={{ maxHeight: "100px", width: "100%", objectFit: "contain" }}
                />
              </div>
              <Row className="gx-3">
                <Col xs={12} sm={6} className="mb-3 mb-sm-0">
                  <Link to={"/request/delivery-part"}>
                    <Button
                      className="w-100"
                      style={{
                        background: "#1CB0F6",
                        border: "none",
                        fontWeight: "600",
                        padding: "12px 0",
                        borderRadius: "8px",
                      }}
                    >
                      Request Delivery
                    </Button>
                  </Link>
                </Col>
                <Col xs={12} sm={6}>
                  <Link to={"/request/pickup-part-import"}>
                    <Button
                      className="w-100"
                      style={{
                        background: "#006EDC",
                        border: "none",
                        fontWeight: "600",
                        padding: "12px 0",
                        borderRadius: "8px",
                      }}
                    >
                      Request Pickup
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </section>

        <Footer />
      </Container>
    </>
  );
}

export default Request;
