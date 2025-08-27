"use client";

import { primaryButon } from "@/utils/commonstyles";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Maintenance = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Image
          src={
            theme.palette.mode === "light"
              ? "/images/backgrounds/maintenance-img.png"
              : "/images/backgrounds/darkmode-maintanance-img.png"
          }
          alt="404"
          width={500}
          height={500}
          style={{ width: "100%", maxWidth: "500px", maxHeight: "500px" }}
        />
        <Typography
          align="center"
          variant="h3"
          sx={{
            color: theme.palette.secondary.textColor,
            mt: "36px",
          }}
        >
          Maintenance Scheduled
        </Typography>
        <Typography
          align="center"
          variant="body3"
          component={"p"}
          mt={"36px"}
          sx={{
            color: theme.palette.secondary.textColor,
            maxWidth: "686px",
            mx: "auto",
          }}
        >
          Our website is currently under maintenance. The end time is
          approximately 1:00 AM. Thank you for your patience.
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap="15px"
          mt={"36px"}
        >
          <Button
            color="primary"
            variant="contained"
            component={Link}
            href="/Exam-Management"
            disableElevation
            sx={{
              borderRadius: "5px",
              color: theme.palette.mode === "light" ? "#FFF" : "#000",
              backgroundColor: theme.palette.secondary.textColor,
              padding: "6px 16px",
              mb: "20px",
              width: "fit-content",
              "&:hover": {
                color: theme.palette.mode === "light" ? "#FFF" : "#000",
                backgroundColor: theme.palette.secondary.textColor,
              },
            }}
          >
            Go to Home
          </Button>
          {/* <Button
            color="primary"
            variant="contained"
            component={Link}
            href="/"
            disableElevation
            sx={{
              borderRadius: "5px",
              fontSize: "12px",
              textDecoration: "underline",
              background: "transparent",
              p: "0px",
              color: theme.palette.secondary.textColor,
              "&:hover": {
                background: "transparent",
                color: theme.palette.secondary.textColor,
                textDecoration: "underline",
              },
            }}
          >
            Contact Administrator
          </Button> */}
        </Stack>
      </Container>
    </Box>
  );
};

Maintenance.layout = "Blank";
export default Maintenance;
