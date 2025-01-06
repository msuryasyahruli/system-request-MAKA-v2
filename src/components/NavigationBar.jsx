import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/maka-logo.png"

function NavigationBar() {
  return (
    <>
      <Navbar className="mb-4" style={{ background: "#21D1FA" }}>
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center fw-bold">
            <img
              src={logo}
              alt="logo"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            Logistic
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
