import { Modal, Backdrop, Fade, Box, Button, useTheme } from "@mui/material";
import React from "react";
import { CloseIcon } from "../Icons";

interface customModalProps {
  open: any;
  handleClose: () => void;
  children: any;
  spacing?: any;
  size?: any;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 460,
  bgcolor: "background.paper",
  borderRadius: "5px",
  p: "86px 40px",
  outline: "none",
};
const CustomModal: React.FC<customModalProps> = ({
  open,
  handleClose,
  children,
  spacing,
  size,
}) => {
  const theme = useTheme();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            ...style,
            bgcolor: theme.palette.background.light,
            p: `${spacing ? spacing : "86px 40px"}`,
            maxWidth: `${size ? size : "460px"}`,
            maxHeight: "90vh",
            overflow: "auto",
          }}
          textAlign={"center"}
        >
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "transparent",
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "fit-content",
              minWidth: "auto",
              p: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& svg path": {
                stroke: theme.palette.text.primary,
              },
            }}
          >
            <CloseIcon />
          </Button>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
