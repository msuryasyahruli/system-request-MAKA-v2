import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import NavBar from "../components/NavigationBar";
import { useState } from "react";

function Request() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [onSuccess, setOnSuccess] = useState(false);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("po_number", data.po_number);
    formData.append("part_name", data.part_name);
    formData.append("quantity", data.quantity);
    formData.append(
      "dimensi_part",
      `${data.length}x${data.width}x${data.height}`
    );
    formData.append("weight", data.weight);
    formData.append("total_cbm", data.total_cbm);
    formData.append("pickup_address", data.pickup_address);
    formData.append("destination_address", data.destination_address);
    formData.append("pickup_date", data.pickup_date);
    formData.append("supplier_name", data.supplier_name);
    formData.append("requester_name", data.requester_name);
    formData.append("shipping_options", data.shipping_options);

    if (data.import_documents && data.import_documents[0]) {
      formData.append("import_documents", data.import_documents[0]);
    } else {
      alert("Please upload import documents.");
      return;
    }

    axios
      .post(`https://maka-system-api-v1.vercel.app/pickup-request`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setOnSuccess(true);
          alert("Request submitted successfully!");
          reset();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting request:", error);
        alert("Failed to submit request. Please try again.");
      });
  };

  return (
    <>
      <NavBar />

      <Container>
        <h2 className="text-center mb-4">Request Pickup Part Import</h2>
        <Card className="shadow mx-auto" style={{ maxWidth: "600px" }}>
          <Card.Body>
            {onSuccess ? (
              <div className="text-center fs-4 fw-medium">
                <p>Request has submited</p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="poNumber" className="mb-3">
                  <Form.Label>Po Number:</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("po_number", {
                      required: "Po number is required",
                    })}
                    placeholder="Enter po number"
                    isInvalid={!!errors.part_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.po_number?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="partName" className="mb-3">
                  <Form.Label>Part name:</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("part_name", {
                      required: "Part name is required",
                    })}
                    placeholder="Enter part name"
                    isInvalid={!!errors.part_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.part_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="quantity" className="mb-3">
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("quantity", {
                      required: "Quantity is required",
                    })}
                    placeholder="Enter amount"
                    isInvalid={!!errors.quantity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantity?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="dimensions" className="mb-3">
                  <Form.Label>Dimension (Length, Width, Height):</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        {...register("length", {
                          required: "Length is required",
                        })}
                        placeholder="Length"
                        isInvalid={!!errors.length}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        {...register("width", {
                          required: "Width is required",
                        })}
                        placeholder="Width"
                        isInvalid={!!errors.width}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        {...register("height", {
                          required: "Height is required",
                        })}
                        placeholder="Height"
                        isInvalid={!!errors.height}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="weight" className="mb-3">
                  <Form.Label>Weight:</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("weight", { required: "Weight is required" })}
                    placeholder="Enter weight"
                    isInvalid={!!errors.weight}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.weight?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="total_cbm" className="mb-3">
                  <Form.Label>Total CBM:</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("total_cbm", {
                      required: "Total CBM is required",
                    })}
                    placeholder="Enter total_cbm"
                    isInvalid={!!errors.total_cbm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.total_cbm?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="pickupAddress" className="mb-3">
                  <Form.Label>Pickup address:</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("pickup_address", {
                      required: "Pickup address is required",
                    })}
                    placeholder="Enter address"
                    isInvalid={!!errors.pickup_address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pickup_address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="destinationAddress" className="mb-3">
                  <Form.Label>Destination address:</Form.Label>
                  <Form.Select
                    {...register("destination_address", {
                      required: "Destination address is required",
                    })}
                    isInvalid={!!errors.destination_address}
                  >
                    <option value="">Choose</option>
                    <option value="Jl. TB Simatupang Blok Delima No.10, RT.3/RW.8, Gedong, Pasar Rebo, East Jakarta City, Jakarta 13760">
                      RnD
                    </option>
                    <option value="MAKA-MOTORS KITIC FACTORY( Kawasan Industri Terpadu Indonesia China - KITIC ), Jl. Kawasan Industri Terpadu Indonesia China Kav 19-1, Desa Nagasari, Kec Serang Baru, Kab. Bekasi West Java 17330">
                      Warehouse Manufacture
                    </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.destination_address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="pickupDate" className="mb-3">
                  <Form.Label>Pickup date:</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("pickup_date", {
                      required: "Pickup date is required",
                    })}
                    isInvalid={!!errors.pickup_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pickup_date?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="supplierName" className="mb-3">
                  <Form.Label>Supplier name:</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("supplier_name", {
                      required: "Supplier name is required",
                    })}
                    placeholder="Enter supplier name"
                    isInvalid={!!errors.supplier_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.supplier_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="requesterName" className="mb-3">
                  <Form.Label>Requester name:</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("requester_name", {
                      required: "Requester name is required",
                    })}
                    placeholder="Enter requester name"
                    isInvalid={!!errors.requester_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.requester_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="importDocuments" className="mb-3">
                  <Form.Label>
                    Document import (Packing List, Commercial Invoice):
                  </Form.Label>
                  <Form.Control
                    type="file"
                    {...register("import_documents", {
                      required: "Document is required",
                    })}
                    isInvalid={!!errors.import_documents}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.import_documents?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="options" className="mb-4">
                  <Form.Label>Options:</Form.Label>
                  <Form.Select
                    {...register("shipping_options", {
                      required: "Shipping option is required",
                    })}
                    isInvalid={!!errors.shipping_options}
                  >
                    <option value="">Choose</option>
                    <option>Air</option>
                    <option>Ocean</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.shipping_options?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Submit Request
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
        <footer className="text-center mt-4">
          <p>&copy; 2025 Maka Logistic</p>
        </footer>
      </Container>
    </>
  );
}

export default Request;
