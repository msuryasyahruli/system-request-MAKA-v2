import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Pagination,
  Form,
  Modal,
} from "react-bootstrap";
import NavBar from "../components/NavigationBar";

function Dashboard() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://maka-system-api-v1.vercel.app/pickup-request"
        );
        if (response.data.status === "success") {
          setData(response.data.data);
          setPagination(response.data.pagination);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://maka-system-api-v1.vercel.app/pickup-request/${id}`
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <NavBar />

      <Container fluid>
        <header className="text-center my-4">
          <h2>Dashboard Pickup Requests</h2>
        </header>
        <Row className="mb-3">
          <Col xs={12} sm={4}>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search..."
                // value={searchQuery}
                // onChange={handleSearch}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={8} className="text-sm-end mt-3 mt-sm-0">
            <Button variant="success">Export to Excel</Button>
          </Col>
        </Row>
        <Table bordered hover responsive className="table-striped">
          <thead className="table-primary text-truncate">
            <tr>
              <th>#</th>
              <th>PO Number</th>
              <th>Part Name</th>
              <th>Quantity</th>
              <th>Dimensions</th>
              <th>Weight</th>
              <th>Total CBM</th>
              <th>Pickup Address</th>
              <th>Destination Address</th>
              <th>Supplier Name</th>
              <th>Requester Name</th>
              <th>Shipping Options</th>
              <th>Request Date</th>
              <th>Pickup Date</th>
              <th>Documents PDF</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <td colSpan="16" className="text-center border">Loading...</td>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {index +
                      1 +
                      (pagination.currentPage - 1) * pagination.limit}
                  </td>
                  <td>{item.po_number}</td>
                  <td>{item.part_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.dimensi_part}</td>
                  <td>{item.weight} kg</td>
                  <td>{item.total_cbm}</td>
                  <td>{item.pickup_address}</td>
                  <td className="text-truncate" style={{ maxWidth: 100 }}>{item.destination_address}</td>
                  <td>{item.supplier_name}</td>
                  <td>{item.requester_name}</td>
                  <td>{item.shipping_options}</td>
                  <td>{new Date(item.request_date).toLocaleDateString()}</td>
                  <td>{new Date(item.pickup_date).toLocaleDateString()}</td>
                  <td>
                    <Button variant="link" size="sm">
                      Download
                    </Button>
                  </td>
                  <td>
                    {/* <Button variant="warning" size="sm">
                      Update
                    </Button> */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delele
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>
            Showing {pagination.limit * (pagination.currentPage - 1) + 1 || 0}{" "}
            to{" "}
            {Math.min(pagination.limit * pagination.currentPage, data.length) ||
              0}{" "}
            of {data.length} entries
          </span>
          <Pagination>
            <Pagination.Prev
              // onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            />
            {Array.from({ length: pagination.totalPage }).map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === pagination.currentPage}
                // onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              // onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPage}
            />
          </Pagination>
        </div>

        <footer className="text-center mt-4">
          <p>&copy; 2025 Maka Logistic</p>
        </footer>
      </Container>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete request</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure you wanna delete data request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmDelete(selectedId)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dashboard;
