import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { CloseIcon } from "@/components/Icons";
import { primaryButon, secondaryButon } from "../commonstyles";
interface CommonPopupProps {
  open: boolean;
  url: string;
  onClose: () => void;
}
const commonModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 460,
  borderRadius: "15px",
  p: "86px 40px",
  outline: "none",
};
const CommonPopup: React.FC<CommonPopupProps> = ({ open, url, onClose }) => {
  const theme = useTheme();
  const router = useRouter();
  const userNavigate = () => {
    router.push(url);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{ ...commonModal, bgcolor: theme.palette.background.light }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Button
          onClick={onClose}
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
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: "24px",
            lineHeight: "36px",
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          Are you sure ?
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "24px",
            color: theme.palette.text.primary,
          }}
        >
          Do you want to cancel this action?
        </Typography>
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button
            sx={{
              ...secondaryButon,
            }}
            onClick={() => userNavigate()}
          >
            Continue
          </Button>
          <Button
            sx={{
              ...primaryButon,
            }}
            onClick={onClose}
          >
            Go back
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommonPopup;
