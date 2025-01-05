import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import NavBar from '../components/NavigationBar'

function Dasboard() {
  const dummyData = Array.from({ length: 15 }).map((_, idx) => ({
    id: idx + 1,
    poNumber: `PO-${idx + 1}`,
    partName: `Sample Part ${idx + 1}`,
    quantity: Math.floor(Math.random() * 100),
    dimensions: "10x10x10",
    weight: `${Math.floor(Math.random() * 50)} kg`,
    pickupAddress: "Jakarta",
    destinationAddress: "Surabaya",
    supplierName: `Supplier-${idx + 1}`,
    requesterName: `Requester-${idx + 1}`,
    shippingOptions: "Air",
    requestDate: `2025-01-${(idx % 30) + 1}`,
    pickupDate: `2025-02-${(idx % 30) + 5}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const currentData = dummyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar/>

      <Container>
        <header className="text-center my-4">
          <h2>Dashboard Pickup Requests</h2>
        </header>
        <Row className="mb-3">
          <Col xs={12} sm={6}>
            <Form.Group controlId="search">
              <Form.Control type="text" placeholder="Search..." />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} className="text-sm-end mt-3 mt-sm-0">
            <Button variant="success">Export to Excel</Button>
          </Col>
        </Row>
        <Table bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>PO Number</th>
              <th>Part Name</th>
              <th>Quantity</th>
              <th>Dimensions</th>
              <th>Weight</th>
              <th>Pickup Address</th>
              <th>Destination Address</th>
              <th>Supplier Name</th>
              <th>Requester Name</th>
              <th>Shipping Options</th>
              <th>Request Date</th>
              <th>Pickup Date</th>
              <th>Documents PDF</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.poNumber}</td>
                <td>{item.partName}</td>
                <td>{item.quantity}</td>
                <td>{item.dimensions}</td>
                <td>{item.weight}</td>
                <td>{item.pickupAddress}</td>
                <td>{item.destinationAddress}</td>
                <td>{item.supplierName}</td>
                <td>{item.requesterName}</td>
                <td>{item.shippingOptions}</td>
                <td>{item.requestDate}</td>
                <td>{item.pickupDate}</td>
                <td>
                  <Button variant="success" size="sm">
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>
            Showing {itemsPerPage * (currentPage - 1) + 1} to{" "}
            {Math.min(itemsPerPage * currentPage, dummyData.length)} of{" "}
            {dummyData.length} entries
          </span>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
        <footer className="text-center mt-4">
          <p>&copy; 2025 Maka Logistic</p>
        </footer>
      </Container>
    </>
  );
}

export default Dasboard;
