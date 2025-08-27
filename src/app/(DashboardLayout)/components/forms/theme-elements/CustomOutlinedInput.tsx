import React from "react";
import { styled } from "@mui/material/styles";
import { OutlinedInput } from "@mui/material";

const CustomOutlinedInput = styled((props: any) => (
  <OutlinedInput {...props} />
))(({ theme }) => ({
  "& input": {
    fontSize: "14px",
    lineHeight: "1",
    padding: "12px 16px 12px 16px",
  },
  "& fieldset": {
    p: "12px 16px 12px 16px",
    border: "1px solid #AFAFAF !important",
    fontSize: "15px",
    lineHeight: 1,
    fontWeight: 400,
    borderRadius: "4px !important",
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
  "& input:disabled + fieldset": {
    border: "0px !important",
  },
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },

  "& .MuiTypography-root": {
    color: theme.palette.text.secondary,
  },

  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
}));

export default CustomOutlinedInput;
