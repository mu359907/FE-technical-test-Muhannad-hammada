import React from "react";
import { Autocomplete } from "@mui/material";
import locationData from "./data";
import CustomCheckbox from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';


const StudentAutocomplete = () => (
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
        placeholder="Search Student"
        aria-label="search-student"
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

export default StudentAutocomplete;
