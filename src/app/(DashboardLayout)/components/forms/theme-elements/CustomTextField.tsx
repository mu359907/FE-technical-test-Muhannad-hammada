import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled((props: any) => (
  <TextField
    {...props}
    sx={{
      "& .MuiInputBase-root:has(textarea)": {
        p: "0px",
      },
      "& :is(input,textarea)": {
        fontSize: "14px",
        lineHeight: "22px",
        p: "12px 16px 12px 16px",
        "& fieldset": {
          border: (theme: any) =>
            `1px solid ${theme.palette.border.input} !important`,
        },
      },
      "& fieldset": {
        p: "12px 16px 12px 16px",
        border: (theme: any) =>
          `1px solid ${theme.palette.border.input} !important`,
        fontSize: "14px",
        lineHeight: "22px",
        fontWeight: 400,
        borderRadius: "4px !important",
        background: "transparent",
      },
      "& input:hover + fieldset,& input:active + fieldset,& input:focus + fieldset":
        {
          border: "1px solid  rgba(115, 138, 150, 0.5)  !important",
        },
      "& .MuiInputBase-root": {
        borderRadius: "4px",
      },
      "& .Mui-error": {
        marginLeft: "0px",
      },
      "& :is(input:disabled,textarea:disabled) ~ fieldset": {
        border: "0px !important",
        background: "transparent",
      },
      "& .Mui-disabled :is(input,textarea)": {
        background: (theme: any) =>
          `${theme.palette.secondary.disableFieldColor} !important`,
        border: (theme: any) =>
          `${theme.palette.secondary.disableFieldColor} !important`,
        borderRadius: "5px",
        minHeight: "22px",
      },
      "& .MuiOutlinedInput-root": {
        minHeight: "46px",
      },
    }}
  />
))(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: "rgb(103, 117, 124)",
    opacity: "1",
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200],
  },
}));

export default CustomTextField;
