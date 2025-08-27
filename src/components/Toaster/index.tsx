import { Box } from "@mui/material";
import React from "react";
import { BlueCrossIcon, Erroricon, RedCrossIcon, SuccessIcon } from "../Icons";
interface toaster {
  text: any;
  status: any;
}
const Toaster: React.FC<toaster> = ({ text, status }) => {
  return (
    <Box
      sx={{
        p: "20px",
        border: `1px solid ${status === "error" ? "#FC4B6C" : "#0362B2"}`,
        background: `${status === "error" ? "#FC4B6C24" : "#0362B233"}`,
        borderRadius: "4px",
        gap: "16px",
        display: "flex",
        alignItems: "center",
        fontSize: "16px",
        color: `${status === "error" ? "#FC4B6C" : "#0362B2"}`,
        width: "fit-content",
      }}
    >
      {status === "error" ? <Erroricon /> : <SuccessIcon />}
      {text}
      {status === "error" ? <RedCrossIcon /> : <BlueCrossIcon />}
    </Box>
  );
};

export default Toaster;
