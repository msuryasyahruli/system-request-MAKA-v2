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
} from "react-bootstrap";
import NavBar from "../components/NavigationBar";

function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://maka-system-request.vercel.app/pickup-request"
        );
        if (response.data.status === "success") {
          setData(response.data.data);
          setFilteredData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter(
      (item) =>
        item.po_number.toLowerCase().includes(query) ||
        item.part_name.toLowerCase().includes(query) ||
        item.supplier_name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar />

      <Container>
        <header className="text-center my-4">
          <h2>Dashboard Pickup Requests</h2>
        </header>
        <div>
          <Row className="mb-3">
            <Col xs={12} sm={4}>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={8} className="text-sm-end mt-3 mt-sm-0">
              <Button variant="success">Export to Excel</Button>
            </Col>
          </Row>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
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
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{item.po_number}</td>
                      <td>{item.part_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.dimensi_part}</td>
                      <td>{item.weight} kg</td>
                      <td>{item.pickup_address}</td>
                      <td>{item.destination_address}</td>
                      <td>{item.supplier_name}</td>
                      <td>{item.requester_name}</td>
                      <td>{item.shipping_options}</td>
                      <td>
                        {new Date(item.request_date).toLocaleDateString()}
                      </td>
                      <td>{new Date(item.pickup_date).toLocaleDateString()}</td>
                      <td>
                        <Button variant="success" size="sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>
              Showing {itemsPerPage * (currentPage - 1) + 1} to{" "}
              {Math.min(itemsPerPage * currentPage, filteredData.length)} of{" "}
              {filteredData.length} entries
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
        </div>

        <footer className="text-center mt-4">
          <p>&copy; 2025 Maka Logistic</p>
        </footer>
      </Container>
    </>
  );
}

export default Dashboard;
