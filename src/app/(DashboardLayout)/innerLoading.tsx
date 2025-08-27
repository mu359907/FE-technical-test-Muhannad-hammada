'use client'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function InnerLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"50px"
      }}
    >
      <CircularProgress />
    </Box>
  );
};

