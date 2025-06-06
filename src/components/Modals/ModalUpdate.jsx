import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import ToastAlert, { toast } from "../Toast";

function ModalUpdate({ onShow, setShow, id, dataDetail, loading, onRefresh }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: dataDetail,
  });

  useEffect(() => {
    if (dataDetail) {
      for (const key in dataDetail) {
        setValue(key, dataDetail[key]);
      }
    }
  }, [dataDetail, setValue]);

  const onSubmit = (data) => {
    // const formData = new FormData();
    // payload.append("shipment_status", data.shipment_status);

    const payload = {
      shipment_status: data.shipment_status,
    };

    axios
      .put(
        `https://maka-system-api-v1.vercel.app/pickup-request/${id}`,
        payload
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setShow(false);
          toast({ message: "Status updated", title: "Success" });
          onRefresh((prev) => prev + 1);
        }
      })
      .catch((error) => {
        console.error("Error updating request:", error);
        toast({
          message: "Failed to update request. Please try again.",
          title: "Error",
        });
      });
  };

  return (
    <>
      <Modal show={onShow} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Form>
              <Form.Group controlId="poNumber" className="mb-3">
                <Form.Label>Shipment Status:</Form.Label>
                <Form.Select
                  {...register("shipment_status", {
                    required: "Status is required",
                  })}
                  isInvalid={!!errors.shipment_status}
                >
                  <option>Waiting</option>
                  <option>On process</option>
                  <option>On delivery</option>
                  <option>Has arrived</option>
                  <option>Finished</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.shipment_status?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit(onSubmit)}>
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastAlert />
    </>
  );
}

export default ModalUpdate;

ModalUpdate.defaultValues = {
  id: "",
  dataDetail: {
    shipment_status: "",
  },
};

ModalUpdate.propTypes = {
  onShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  id: PropTypes.string,
  dataDetail: PropTypes.shape({
    shipment_status: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
