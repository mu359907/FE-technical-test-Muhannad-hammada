import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { EyeIcon } from "@/components/Icons";
import { Button, Grid, Link, Typography } from "@mui/material";
import { Box, Stack, border, borderRadius, color } from "@mui/system";
import React from "react";

const CreateProfile = () => {
  return (
    <>
      <Box
        sx={{
          background: "#DFF3FF",
          borderRadius: "15px",
          border: "1px solid #738A9633",
          p: "30px",
          width: "100%",
        }}
      >
        <Grid container spacing={"15px"}>
          <Grid item md={6}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "15px",
                lineHeight: "17px",
                color: "#2F2F2F",
                fontWeight: 400,
                mb: "10px",
              }}
            >
              First Name
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              sx={{
                "& fieldset": {
                  border: "1px solid #738A9633",
                  background: "#FFF",
                  borderRadius: "4px",
                  color: "#7A878D",
                },
              }}
            />
          </Grid>
          <Grid item md={6}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "15px",
                lineHeight: "17px",
                color: "#2F2F2F",
                fontWeight: 400,
                mb: "10px",
              }}
            >
              Last Name
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              sx={{
                "& fieldset": {
                  border: "1px solid #738A9633",
                  background: "#FFF",
                  borderRadius: "4px",
                  color: "#7A878D",
                },
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "15px",
                lineHeight: "17px",
                color: "#2F2F2F",
                fontWeight: 400,
                mb: "10px",
              }}
            >
              Email
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              sx={{
                "& fieldset": {
                  border: "1px solid #738A9633",
                  background: "#FFF",
                  borderRadius: "4px",
                  color: "#7A878D",
                },
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "15px",
                lineHeight: "17px",
                color: "#2F2F2F",
                fontWeight: 400,
                mb: "10px",
              }}
            >
              Confirm Email
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              sx={{
                "& fieldset": {
                  border: "1px solid #738A9633",
                  background: "#FFF",
                  borderRadius: "4px",
                  color: "#7A878D",
                },
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "15px",
                lineHeight: "17px",
                color: "#2F2F2F",
                fontWeight: 400,
                mb: "10px",
              }}
            >
              Phone Number
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              sx={{
                "& fieldset": {
                  border: "1px solid #738A9633",
                  background: "#FFF",
                  borderRadius: "4px",
                  color: "#7A878D",
                },
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "15px",
                lineHeight: "17px",
                color: "#2F2F2F",
                fontWeight: 400,
                mb: "10px",
              }}
            >
              Password
            </Typography>
            <Stack
              position={"relative"}
              sx={{
                "& svg": {
                  position: "absolute",
                  right: "16px",
                },
                "& svg path": {
                  fill: "#343A40",
                },
              }}
              alignItems={"center"}
              direction={"row"}
            >
              <CustomTextField
                id="username"
                variant="outlined"
                fullWidth
                sx={{
                  "& fieldset": {
                    border: "1px solid #738A9633",
                    background: "#FFF",
                    borderRadius: "4px",
                    color: "#7A878D",
                  },
                }}
              />
              <EyeIcon />
            </Stack>
          </Grid>
          <Grid item md={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "15px",
                lineHeight: "17px",
                color: "#2F2F2F",
                fontWeight: 400,
                mb: "10px",
              }}
            >
              Confirm Password
            </Typography>
            <Stack
              position={"relative"}
              sx={{
                "& svg": {
                  position: "absolute",
                  right: "16px",
                },
                "& svg path": {
                  fill: "#343A40",
                },
              }}
              alignItems={"center"}
              direction={"row"}
            >
              <CustomTextField
                id="username"
                variant="outlined"
                fullWidth
                sx={{
                  "& fieldset": {
                    border: "1px solid #738A9633",
                    background: "#FFF",
                    borderRadius: "4px",
                    color: "#7A878D",
                  },
                }}
              />
              <EyeIcon />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateProfile;
