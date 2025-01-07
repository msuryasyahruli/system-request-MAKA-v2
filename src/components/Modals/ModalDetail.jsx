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
            <>
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
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDetail;

ModalDetail.propTypes = {
  onShow: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  data: PropTypes.shape({
    po_number: PropTypes.string.isRequired,
    part_name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    dimensi_part: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    total_cbm: PropTypes.number.isRequired,
    pickup_address: PropTypes.string.isRequired,
    destination_address: PropTypes.string.isRequired,
    pickup_date: PropTypes.string.isRequired,
    supplier_name: PropTypes.string.isRequired,
    requester_name: PropTypes.string.isRequired,
    import_documents: PropTypes.string.isRequired,
    shipping_options: PropTypes.string.isRequired,
    request_date: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};
