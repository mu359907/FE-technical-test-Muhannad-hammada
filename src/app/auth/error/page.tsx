"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <Image
        src={"/images/backgrounds/errorimg-01.svg"}
        alt="404"
        width={500}
        height={500}
        style={{ width: "100%", maxWidth: "500px", maxHeight: "500px" }}
      />
      <Typography
        align="center"
        variant="h1"
        sx={{
          color: "#02376D",
          fontSize: "21px",
          fontWeight: 600,
        }}
      >
        404- Page not found
      </Typography>
      <Typography
        align="center"
        variant="h4"
        mb={4}
        sx={{
          fontSize: "14px",
          color: "#02376D",
        }}
      >
        The page you are looking for may have been moved, deleted, or never
        existed.
      </Typography>
      <Stack direction={"column"} alignItems={"center"}>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          href="/Exam-Management"
          disableElevation
          sx={{
            minWidth: "140px",
            mb: 2,
          }}
        >
          Go Back
        </Button>
        {/* <Link href="#" className="c-link">
          Contact Administrator
        </Link> */}
      </Stack>
    </Container>
  </Box>
);

Error.layout = "Blank";
export default Error;
