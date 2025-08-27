"use client";

import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect";
import { selectStyle1 } from "@/utils/commonstyles";
import { MenuItem, useTheme } from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (value: number) => void;
  value: number;
}
const DEFAULT = 50;
const COMMON_PAGE_STRING = "/page";
const DEFAULT_SELECT = { value: 50, label: `50${COMMON_PAGE_STRING}` };

const BulkData = [
  {
    value: 100,
    label: `100${COMMON_PAGE_STRING}`,
  },
  {
    value: 250,
    label: `250${COMMON_PAGE_STRING}`,
  },
];

const WithPaginationSelect = ({ value, onChange }: Props) => {
  const [defaultValue, setDefaultValue] = useState(value || DEFAULT);
  const theme = useTheme();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target?.value;
    if (value) {
      onChange(+value);
      setDefaultValue(+value);
    }
  };

  return (
    <CustomSelect
      id="standard-select-currency"
      name="StudentTitle"
      variant="outlined"
      displayEmpty
      value={defaultValue}
      onChange={handleChange}
      sx={{
        ...selectStyle1,
        "& .MuiSelect-select": {
          p: "7px 14px",
          color:
            theme.palette.mode === "light"
              ? "#6C757D !important"
              : "#fff !important",
          "-webkit-text-fill-color":
            theme.palette.mode === "light"
              ? "#6C757D !important"
              : "#fff !important",
        },
      }}
      MenuProps={{
        style: {
          maxHeight: 350,
        },
      }}
    >
      <MenuItem
        key={0}
        value={DEFAULT_SELECT.value}
        sx={{
          fontSize: "0.875rem",
          lineHeight: "1.05rem",
          color:
            theme.palette.mode === "light"
              ? "#000 !important"
              : "#fff !important",
        }}
      >
        {DEFAULT_SELECT.label}
      </MenuItem>
      {BulkData.map(({ value, label }, index) => {
        return (
          <MenuItem
            key={index + 1}
            value={value}
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.05rem",
              color:
                theme.palette.mode === "light"
                  ? "#000 !important"
                  : "#fff !important",
            }}
          >
            {label}
          </MenuItem>
        );
      })}
    </CustomSelect>
  );
};

export default WithPaginationSelect;
