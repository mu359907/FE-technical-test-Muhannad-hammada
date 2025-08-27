import React from "react";
import { styled } from "@mui/material/styles";
import { Select } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { commonDropdownMenuStyle, commonField } from "@/utils/commonstyles";
import zIndex from "@mui/material/styles/zIndex";

const CustomSelect = styled((props: any) => (
  <Select
    {...props}
    IconComponent={ExpandMoreIcon}
    sx={commonField}
    MenuProps={{
      disableScrollLock: true,
      style: {
        maxHeight: 350,
        zIndex: 1300,
      },
      PaperProps: {
        sx: commonDropdownMenuStyle,
      },
    }}
  />
))(({}) => ({}));

export default CustomSelect;
