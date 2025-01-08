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
  OverlayTrigger,
  Tooltip,
  Dropdown,
  DropdownButton,
  Spinner,
} from "react-bootstrap";
import NavBar from "../components/NavigationBar";
import ModalDetail from "../components/Modals/ModalDetail";
import ModalUpdate from "../components/Modals/ModalUpdate";
import ToastAlert, { toast } from "../components/Toast";

function Dashboard() {
  const [dataList, setDataList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [listDetail, setListDetail] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [onClickDetail, setClickDetail] = useState(false);
  const [onClickUpdate, setClickUpdate] = useState(false);
  const [onClickDelete, setClickDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [refetchKey, setRefetchKey] = useState(0);
  const [option, setOption] = useState({
    page: 1,
    search: "",
  });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPage) {
      setOption((prev) => ({ ...prev, page: page }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://maka-system-api-v1.vercel.app/pickup-request`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: option,
          }
        );
        if (res.data.status === "success") {
          setDataList(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [option, refetchKey]);

  const handleDetail = async (id) => {
    setSelectedId(id);
    setClickDetail(true);
  };

  const handleUpdate = async (id) => {
    setSelectedId(id);
    setClickUpdate(true);
  };

  const handleDelete = async (id) => {
    setSelectedId(id);
    setClickDelete(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://maka-system-api-v1.vercel.app/pickup-request/${id}`
      );
      toast({ message: response.data.message, title: "Success" });
      setClickDelete(false);
      setRefetchKey((prev) => prev + 1);
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  useEffect(() => {
    setLoadingDetail(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://maka-system-api-v1.vercel.app/pickup-request/${selectedId}`
        );
        if (res.data.status === "success") {
          setListDetail(res.data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchData();
  }, [selectedId]);

  const renderTooltip = (props, text) => (
    <Tooltip id="tooltip" {...props}>
      {text}
    </Tooltip>
  );

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
                value={option.search}
                onChange={(e) =>
                  setOption((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={8} className="text-sm-end mt-3 mt-sm-0">
            <Button variant="success">Export to Excel</Button>
          </Col>
        </Row>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table bordered hover responsive className="table-striped">
            <thead className="table-primary text-truncate">
              <tr>
                <th>#</th>
                <th>PO Number</th>
                <th>Part Name</th>
                <th>Quantity</th>
                {/* <th>Dimensions</th>
                <th>Weight</th> */}
                <th>Total CBM</th>
                <th>Pickup Address</th>
                <th>Destination Address</th>
                <th>Supplier Name</th>
                <th>Requester Name</th>
                <th>Shipping Options</th>
                {/* <th>Request Date</th> */}
                <th>Pickup Date</th>
                <th>Document Import</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {index +
                        1 +
                        (pagination.currentPage - 1) * pagination.limit}
                    </td>
                    <td>{item.po_number}</td>
                    <td>{item.part_name}</td>
                    <td>{item.quantity}</td>
                    {/* <td>{item.dimensi_part}</td>
                    <td>{item.weight} kg</td> */}
                    <td>{item.total_cbm}</td>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 300 }}
                      overlay={(props) =>
                        renderTooltip(props, item.pickup_address)
                      }
                    >
                      <td className="text-truncate" style={{ maxWidth: 100 }}>
                        {item.pickup_address}
                      </td>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 300 }}
                      overlay={(props) =>
                        renderTooltip(props, item.destination_address)
                      }
                    >
                      <td className="text-truncate" style={{ maxWidth: 200 }}>
                        {item.destination_address}
                      </td>
                    </OverlayTrigger>
                    <td>{item.supplier_name}</td>
                    <td>{item.requester_name}</td>
                    <td>{item.shipping_options}</td>
                    {/* <td>{new Date(item.request_date).toLocaleDateString()}</td> */}
                    <td>{new Date(item.pickup_date).toLocaleDateString()}</td>
                    <td>
                      <Button variant="link" size="sm">
                        {item.import_documents}
                      </Button>
                    </td>
                    <td className="text-truncate">
                      {" "}
                      <p className="bg-warning rounded-pill px-1 text-center">
                        {item.shipment_status}
                      </p>{" "}
                    </td>
                    <td className="text-center">
                      <DropdownButton
                        variant="secondary"
                        size="sm"
                        title="Menu"
                      >
                        <Dropdown.Item onClick={() => handleDetail(item.id)}>
                          Detail
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleUpdate(item.id)}>
                          Update
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(item.id)}>
                          Delete
                        </Dropdown.Item>
                      </DropdownButton>
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
        )}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>
            Showing {pagination.limit * (pagination.currentPage - 1) + 1 || 0}{" "}
            to{" "}
            {Math.min(
              pagination.limit * (pagination.currentPage - 1) + dataList.length
            ) || 0}{" "}
            of {pagination.totalData || 0} entries
          </span>
          <Pagination className="m-0">
            <Pagination.Prev
              onClick={() => handlePageChange(option.page - 1)}
              disabled={option.page === 1}
            />
            {Array.from({ length: pagination.totalPage }).map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === option.page}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(option.page + 1)}
              disabled={option.page === pagination.totalPage}
            />
          </Pagination>
        </div>

        <footer className="text-center mt-4">
          <p>&copy; 2025 Maka Logistic</p>
        </footer>
      </Container>

      <ModalDetail
        onShow={onClickDetail}
        setShow={(v) => setClickDetail(v)}
        data={listDetail}
        loading={loadingDetail}
      />

      <ModalUpdate
        onShow={onClickUpdate}
        setShow={(v) => setClickUpdate(v)}
        dataDetail={listDetail}
        loading={loadingDetail}
        id={selectedId}
        onRefresh={(v) => setRefetchKey(v)}
      />

      <Modal
        show={onClickDelete}
        onHide={() => setClickDelete(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete request</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure you wanna delete data request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setClickDelete(false)}>
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

      <ToastAlert />
    </>
  );
}

export default Dashboard;
