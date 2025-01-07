import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

function ToastAlert(onShow) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(onShow);
  }, [onShow]);

  return (
    <div className="absolute">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        position="top-center"
        style={{ zIndex: 1 }}
      >
        <Toast.Header>
          <strong className="me-auto">Alert</strong>
        </Toast.Header>
        <Toast.Body>
          <p>Woohoo, you're reading this text in a Toast!</p>{" "}
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastAlert;
