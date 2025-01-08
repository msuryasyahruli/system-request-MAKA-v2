import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

const ToastManager = {
  triggerToast: null,
};

function ToastAlert() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    ToastManager.triggerToast = ({ message, title }) => {
      setMessage(message);
      setShow(true);
      setTitle(title);
    };
  }, []);

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={5000}
      autohide
      style={{ zIndex: 1, position: "fixed", top: 10, right: 10 }}
    >
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const toast = (options) => {
  if (ToastManager.triggerToast) {
    ToastManager.triggerToast(options);
  } else {
    console.error("ToastAlert is not mounted yet!");
  }
};

export default ToastAlert;
