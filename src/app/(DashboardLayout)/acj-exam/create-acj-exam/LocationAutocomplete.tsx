import React from "react";
import { Autocomplete } from "@mui/material";
import locationData from "./data";
import CustomCheckbox from "../../components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";

const LocationAutocomplete = () => (
  <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={locationData}
    disableCloseOnSelect
    getOptionLabel={(option) => option.title}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <CustomCheckbox style={{ marginRight: 8 }} checked={selected} />
        {option.title}
      </li>
    )}
    fullWidth
    renderInput={(params) => (
      <CustomTextField
        {...params}
        placeholder="Select Your Location"
        aria-label="Select-Your-Location"
      />
    )}
    sx={{
      
      [`& .MuiChip-filled`]: {
        padding: "0",
        fontSize: "15px",
        fontWeight:400,
        backgroundColor: "rgba(0, 0, 0, 0.05)"
      },
    }}
  />
);

export default LocationAutocomplete;
