import { Stack, Tooltip, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import { HiArrowUp } from "../Icons";

const SortableHeader = ({
  field,

}: {
  field: string;
}) => {
  const theme = useTheme();

  return (
    <Typography
      color={theme.palette.primary.main}
      variant="h6"
      display={"flex"}
      alignItems={"center"}
      gap={0.5}
      component={"p"}
      fontWeight={400}
      sx={{ position: "relative", cursor: "pointer" }}
    >
      <Tooltip
        title={field || ""}
        placement="top"
        disableHoverListener={!field}
      >
        <span>{field}</span>
      </Tooltip>
    </Typography>
  );
};

export default memo(SortableHeader);
