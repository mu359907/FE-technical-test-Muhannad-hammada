import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "@/store/hooks";
import {
  toggleSidebar,
  toggleMobileSidebar,
} from "@/store/customizer/CustomizerSlice";
import { IconMenu2 } from "@tabler/icons-react";
// import Notifications from "./Notification";
import Profile from "./Profile";
// import Cart from "./Cart";
import Search from "./Search";
import Language from "./Language";
import { AppState } from "@/store/store";
// import MobileRightSidebar from "./MobileRightSidebar";
import Logo from "../../shared/logo/Logo";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const currentPath = usePathname();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);

  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    // boxShadow:
    //   "0 3px 5px -1px rgba(0, 0, 0, .2),0 5px 8px 0 rgba(0, 0, 0, .14),0 1px 14px 0 rgba(0, 0, 0, .12)!important",
    background: theme.palette.navbar,
    justifyContent: "center",
    minHeight: "84px !important",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.warning.contrastText,
  }));

  return (
    <AppBarStyled
      position="sticky"
      color="default"
      sx={{
        zIndex: "1200",
      }}
    >
      <ToolbarStyled
        sx={{
          pl: "18px !important",
        }}
      >
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {currentPath !== "/student-view/in-person" &&
          !currentPath.startsWith("/situational-timer/") &&
          !currentPath.startsWith("/station-view") && (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={
                lgUp
                  ? () => dispatch(toggleSidebar())
                  : () => dispatch(toggleMobileSidebar())
              }
            >
              <IconMenu2 size="26" />
            </IconButton>
          )}

        {/* ------------------------------------------- */}
        {/* Logo */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            // width: toggleWidth,
            width: "120px",
            paddingLeft: "15px",
          }}
        >
          <Logo />
          {/* {customizer.isCollapse && !customizer.isSidebarHover ? <Logo /> : <IconMenu2 size="22" />} */}
        </Box>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Notifications /> */}
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
