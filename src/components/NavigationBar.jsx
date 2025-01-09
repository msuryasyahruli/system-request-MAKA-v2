import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/maka-logo.png"

function NavigationBar() {
  return (
    <>
      <Navbar className="mb-4" style={{ background: "#21D1FA", position: "sticky", top: 0, zIndex: 1 }}>
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center fw-bold fs-4 py-0">
            <img
              src={logo}
              alt="logo"
              height="50"
              className="d-inline-block align-top me-1"
            />
            Logistic
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
