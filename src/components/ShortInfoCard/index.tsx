import theme from "@/utils/theme";
import { Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
interface ShortInfoCardProps {
  icon: any;
  title: string;
  desc: string;
  color: string;
}
const ShortInfoCard: React.FC<ShortInfoCardProps> = ({
  icon,
  title,
  desc,
  color,
}) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        "& > img": {
          height: "80px",
          width: "80px",
          borderRadius: "50%",
          objectFit: "cover",
        },
      }}
      direction={"row"}
      alignItems={"center"}
      gap={"16px"}
    >
      <Stack
        height={"48px"}
        width={"48px"}
        sx={{
          borderRadius: "50%",
          background: color,
          alignItems: "center",
          justifyContent: "center",
          "& img": {
            filter:
              theme.palette.mode === "light"
                ? "none"
                : "brightness(0) invert(1)",
          },
        }}
      >
        {icon}
      </Stack>
      <Stack>
        <Typography
          variant="h4"
          sx={{
            fontSize: "18px",
            lineHeight: "25px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            mb: "4px",
            color: theme.palette.mode === "light" ? "#111C2D" : "#fff",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          color={theme.palette.text.secondary}
          sx={{
            fontSize: "15px",
            lineHeight: "21px",
            fontWeight: 400,
            color: theme.palette.mode === "light" ? "#111C2D99" : "#fff",
          }}
        >
          {desc}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ShortInfoCard;
