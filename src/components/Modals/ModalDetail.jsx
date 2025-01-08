import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function ModalDetail({ onShow, setShow, data, loading }) {
  return (
    <>
      <Modal size="lg" show={onShow} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <div
              className="p-4 border rounded shadow-sm"
              style={{ backgroundColor: "#fff" }}
            >
              <h2 className="text-center mb-4 fw-bold">Request</h2>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Po Number</div>
                <div className="col-8">: {data.po_number}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Part Name</div>
                <div className="col-8">: {data.part_name}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Quantity</div>
                <div className="col-8">: {data.quantity}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Dimensi Part</div>
                <div className="col-8">: {data.dimensi_part} (L*W*H)</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Weight</div>
                <div className="col-8">: {data.weight} kg</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Total CBM</div>
                <div className="col-8">: {data.total_cbm}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Pickup Address</div>
                <div className="col-8">: {data.pickup_address}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Destination Address</div>
                <div className="col-8">: {data.destination_address}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Supplier Name</div>
                <div className="col-8">: {data.supplier_name}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Requester Name</div>
                <div className="col-8">: {data.requester_name}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Documents</div>
                <div className="col-8">: {data.import_documents}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Shipping Option</div>
                <div className="col-8">: {data.shipping_options}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Shipment Status</div>
                <div className="col-8">: {data.shipment_status}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Pickup Date</div>
                <div className="col-8">
                  : {new Date(data.pickup_date).toLocaleDateString()}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-4 fw-semibold">Request Date</div>
                <div className="col-8">
                  : {new Date(data.request_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDetail;

ModalDetail.defaultValues = {
  data: {
    po_number: "",
    part_name: "",
    quantity: 0,
    dimensi_part: "",
    weight: 0,
    total_cbm: 0,
    pickup_address: "",
    destination_address: "",
    pickup_date: "",
    supplier_name: "",
    requester_name: "",
    import_documents: "",
    shipping_options: "",
    shipment_status: "",
    request_date: "",
  },
};

ModalDetail.propTypes = {
  onShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  data: PropTypes.shape({
    po_number: PropTypes.string,
    part_name: PropTypes.string,
    quantity: PropTypes.number,
    dimensi_part: PropTypes.string,
    weight: PropTypes.number,
    total_cbm: PropTypes.number,
    pickup_address: PropTypes.string,
    destination_address: PropTypes.string,
    pickup_date: PropTypes.string,
    supplier_name: PropTypes.string,
    requester_name: PropTypes.string,
    import_documents: PropTypes.string,
    shipping_options: PropTypes.string,
    shipment_status: PropTypes.string,
    request_date: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
};
