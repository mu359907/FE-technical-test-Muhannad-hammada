import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { inputStyle1, primaryButon } from "@/utils/commonstyles";
import { Modal, Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { IconX } from "@tabler/icons-react";
import React from "react";

interface deleteModal {
  open: any;
  handleClose: () => void;
  handleChange: (event: any) => void;
  handleClick: () => void;
}

const DeleteModalComponent: React.FC<deleteModal> = ({
  open,
  handleClose,
  handleChange,
  handleClick,
}) => {
  const theme = useTheme();
  const styleModal = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 450,
    bgcolor: theme.palette.background.light,
    boxShadow: 20,
    p: "66px 32px 32px",
    [`& .delete-modal-graphic`]: { marginRight: "15px" },
    borderRadius: "8px",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...styleModal }} display={"flex"} flexDirection={"column"}>
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            borderRadius: "5px",
            color: theme.palette.primary.main,
            padding: "3px",
            width: "28px",
            height: "28px",
            minWidth: "0",
            lineHeight: "1",
            textAlign: "center",
            backgroundColor: "transparent",

            "&:hover": {
              color: theme.palette.primary.main,
              backgroundColor: "transparent",
            },
            "& svg path": {
              stroke: theme.palette.mode === "light" ? "#000" : "#fff",
            },
          }}
        >
          <IconX size={"1.75rem"} />
        </Button>
        <Typography id="modal-modal-title" variant="h3" mb={"8px"}>
          Are you sure ?
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="body4"
          component="p"
          mb={"20px"}
        >
          This action cannot be undone. This will permanently delete all the
          selected listings from the listing table.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: `${theme.palette.mode === "light" ? "#67757C" : "#FFFFFF"}`,
            fontWeight: 500,
            mb: "8px",
          }}
        >
          Please type in{" "}
          <Box component={"span"} color={theme.palette.primary.main}>
            PrepX
          </Box>{" "}
          to confirm:
        </Typography>
        <CustomTextField
          id=""
          variant="outlined"
          fullWidth
          placeholder={"PrepX"}
          onChange={handleChange}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              handleClick(); // Call function on Enter key press from input field
            }
          }}
        />
        <Box p={"25px 0 0"}>
          <Button
            fullWidth
            sx={{
              ...primaryButon,
              p: "8px 16px",
              bgcolor: theme.palette.primary.main,
              color: theme.palette.mode === "light" ? "#fff" : "#000",
              "&:hover": {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.mode === "light" ? "#fff" : "#000",
              },
            }}
            onClick={handleClick}
          >
            I understand, delete these listings.
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModalComponent;
