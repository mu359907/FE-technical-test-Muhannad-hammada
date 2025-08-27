import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { useSelector, useDispatch } from "@/store/hooks";
import {
  hoverSidebar,
  toggleMobileSidebar,
} from "@/store/customizer/CustomizerSlice";
import Scrollbar from "@/app/(DashboardLayout)/components/custom-scroll/Scrollbar";
import { AppState } from "@/store/store";
import AuthLogo from "../../shared/logo/AuthLogo";
import { Profile } from "./SidebarProfile/Profile";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const pathname = usePathname();
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;
  const onHoverEnter = () => {
    // if (customizer.isCollapse) {
    //   dispatch(hoverSidebar(true));
    // }
  };
  // const onHoverLeave = () => {
  //   dispatch(hoverSidebar(false));
  // };
  if (lgUp) {
    return (
      <Box
        sx={{
          zIndex: 100,
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: "absolute",
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          // onMouseEnter={onHoverEnter}
          // onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: "border-box",
              border: "0",
              top: "86px",
              boxShadow: "1px 0 20px #00000014",
              background: theme.palette.background.light,
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            borderRadius="0 !important"
            sx={{
              height: "100%",
            }}
          >
            <Profile />
            <SidebarItems />
          </Box>
        </Drawer>
      </Box>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      sx={{
        zIndex: "1199",
      }}
      PaperProps={{
        style: {
          zIndex: "1199",
        },
        sx: {
          zIndex: "1199",
          pt: "70px",
          width: customizer.SidebarWidth,
          // backgroundColor:
          //   customizer.activeMode === 'dark'
          //     ? customizer.darkBackground900
          //     : customizer.activeSidebarBg,
          // color: customizer.activeSidebarBg === '#FFFFFF' ? '' : 'white',
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <AuthLogo />
      </Box>
      <Profile />
      <SidebarItems />
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}

    </Drawer>
  );
};
export default Sidebar;
