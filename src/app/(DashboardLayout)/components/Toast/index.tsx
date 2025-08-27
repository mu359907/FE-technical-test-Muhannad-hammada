import React from "react";
import PropTypes from "prop-types";
import { toast, ToastContent } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from "react-icons/fa";
interface ToastMessageProps {
  type: "success" | "info" | "error" | "warning";
  message: string;
}
export const displayIcon = (type: string): JSX.Element => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};
const ToastMessage: React.FC<ToastMessageProps> = ({ type, message }) => {
  // const content: ToastContent = (
  //   <div className="toast" style={{ display: "flex" }}>
  //     <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
  //       {message}
  //     </div>
  //   </div>
  // );

  toast[type](message, {
    autoClose: 3000, // Toast disappears after 3 seconds
    pauseOnFocusLoss: false, // Keeps the timer running even when the page is out of focus
  });

  return null; // React.FC components must return JSX, returning null as it doesn't render anything directly
};
ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "info", "error", "warning"] as const)
    .isRequired,
};
export const dismissToasts = () => {
  toast.dismiss();
};
export default ToastMessage;
