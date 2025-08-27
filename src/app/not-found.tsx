"use client";
import Image from "next/image";
import Link from "next/link";
import {
  styled,
  Container,
  Box,
  useTheme,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaginationProvider } from "@/utils/pagination";
import { usePathname } from "next/navigation";
import Customizer from "./(DashboardLayout)/layout/shared/customizer/Customizer";
import Header from "./(DashboardLayout)/layout/vertical/header/Header";
import Sidebar from "./(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import ToastProvider from "./toasterProvider";
import { AppState } from "@/store/store";
import { useSelector } from "react-redux";
import { primaryButon } from "@/utils/commonstyles";

export const NotFound = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="calc(100vh - 176px)"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Image
          src={
            theme.palette.mode === "light"
              ? "/images/backgrounds/errorimg-01.svg"
              : "/images/backgrounds/not-found-darkmode-img.png"
          }
          alt="404"
          width={450}
          height={454}
        />
        <Typography
          align="center"
          variant="h3"
          sx={{
            color: theme.palette.text.primary,
            mt: "36px",
            mb: "0px"
          }}
        >
          404 - Page not found
        </Typography>
        <Typography
          align="center"
          variant="body3"
          component={"p"}
          mt={"36px"}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          The page you are looking for may have been moved, deleted, or never
          existed.
        </Typography>
        <Stack
          direction={"column"}
          alignItems={"center"}
          mt={"36px"}
          sx={{
            "& .c-link": {
              color: theme.palette.primary.main,
            },
          }}
        >
          <Button
            color="primary"
            variant="contained"
            component={Link}
            href="/Exam-Management"
            disableElevation
            sx={{ ...primaryButon, padding: "6px 16px", mb: "20px" }}
          >
            Go to Home
          </Button>
          {/* <Link href="/" className="c-link">
            Contact Administrator
          </Link> */}
        </Stack>
      </Container>
    </Box>
  );
};

NotFound.layout = "Blank";

const MainWrapper = styled("div")(() => ({
  // display: "flex",
  // minHeight: "100vh",
  // width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  // paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  background: "transparent !important",
}));

export default function Error() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const currentPath = usePathname();
  // console.log(currentPath);
  useEffect(() => {
    // console.log(currentPath);
  }, []);
  const sxStyles = {
    background: "transparent",
    pb: "0",
    ...(customizer.isHorizontal == false && {
      [theme.breakpoints.up("lg")]: {
        ml: `${customizer.SidebarWidth}px`,
      },
    }),
    ...(customizer.isCollapse && {
      [theme.breakpoints.up("lg")]: {
        ml: `${customizer.MiniSidebarWidth}px`,
      },
    }),
  };

  return (
    <PaginationProvider>
      <ToastProvider>
        <MainWrapper>
          <Header />
          <Sidebar />
          <PageWrapper
            className="page-wrapper"
            sx={currentPath !== "/student-view/in-person" ? sxStyles : {}}
          >
            {/* PageContent */}
            <Container
              sx={{
                maxWidth:
                  currentPath === "/student-view/in-person" ||
                    currentPath === "/station-view"
                    ? "1600px !important"
                    : "100%",
              }}
            >
              <Box sx={{ minHeight: "calc(100vh - 186px)" }}>
                <NotFound />
              </Box>
            </Container>
            <Customizer />
            <Stack
              sx={{
                fontSize: "15px",
                color: theme.palette.secondary.fieldText,
                p: "20px",
                borderTop: "1px solid #738A9633",
                mt: "50px",
              }}
            >
              All rights reserved by Prep Doctors
            </Stack>
          </PageWrapper>
        </MainWrapper>
      </ToastProvider>
    </PaginationProvider>
  );
}
