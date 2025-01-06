import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/maka-logo.png"

function NavigationBar() {
  return (
    <>
      <Navbar variant="dark" className="mb-4" style={{ background: "#21D1FA" }}>
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src={logo}
              alt="logo"
              style={{ height: 64, marginRight: 2 }}
            />
            <b className="fs-2 text-black">Logistic</b>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
