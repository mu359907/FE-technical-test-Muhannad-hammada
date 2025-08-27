import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  useTheme,
  Link,
  Autocomplete,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
const role = [{ name: "Doctor" }, { name: "Instructor" }];
const SelectRole = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState<string | null>(role[0].name);
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
          <Grid item md={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "20px",
                lineHeight: "23px",
                color: "#2D363E",
                fontWeight: 500,
                mb: "10px",
              }}
            >
              Tell us a bit about yourself
            </Typography>
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
              What is your role?
            </Typography>
            <Autocomplete
              id="country-select-demo"
              fullWidth
              options={role}
              autoHighlight
              getOptionLabel={(option: any) => option.name}
              onChange={(option: any) => {
                setValue(option.name);
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.name}>
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  placeholder=""
                  aria-label="Choose a country"
                />
              )}
              sx={{
                "& .MuiInputBase-root": {
                  p: "5px 10px",
                  borderRadius: "4px",
                  color: "#2D363E",
                  bgcolor: "#FFF",
                },
              }}
            />
            {value}
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
              Are you currently enrolled with PrepDoctors?
            </Typography>
            <Autocomplete
              id="country-select-demo"
              fullWidth
              options={role}
              autoHighlight
              getOptionLabel={(option: any) => option.name}
              renderOption={(props, option) => (
                <li {...props} key={option.name}>
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  placeholder=""
                  aria-label="Choose a country"
                />
              )}
              sx={{
                "& .MuiInputBase-root": {
                  p: "5px 10px",
                  borderRadius: "4px",
                  color: "#2D363E",
                  bgcolor: "#FFF",
                },
              }}
            />
          </Grid>
          <Grid item md={12}>
            <FormControlLabel
              control={
                <CustomCheckbox
                  sx={{
                    "& input:checked + span": {
                      background: "#02376D",
                    },
                  }}
                />
              }
              name="StudentSameAsMailingAddress"
              label="By creating an account, you agree to the"
              sx={{
                mr: "5px",
                [`& .MuiFormControlLabel-label`]: {
                  padding: "0",
                  color: "#3A4752",
                  fontWeight: 400,
                  fontSize: "12px",
                },
              }}
            />
            <Link
              href={""}
              sx={{
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              Terms of Service.
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SelectRole;
