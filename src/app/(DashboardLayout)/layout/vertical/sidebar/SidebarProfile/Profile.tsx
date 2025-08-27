import {
  Box,
  Avatar,
  Typography,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { IconPower } from "@tabler/icons-react";
import Link from "next/link";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  return "";
};
