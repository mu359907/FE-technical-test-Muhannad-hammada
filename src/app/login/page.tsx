"use client";
import Link from "next/link";
import { Grid, Box, Stack, Typography, CircularProgress } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import AuthLogo from "@/app/(DashboardLayout)/layout/shared/logo/AuthLogo";
import AuthLogin from "../auth/authForms/AuthLogin";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import LoginLeftSection from "./LoginLeftSection";
import { useTheme } from "@mui/material/styles";

export default function Login() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      const loginRoleID: any = (
        session?.user?.name as { RoleID?: string }
      )?.RoleID

      if (session) {
        if (loginRoleID === 3 || loginRoleID === 2) {
          router.push("/Exam-Management");
          return;
          // window.location.href = "/imock-exam";
        }
        router.push("/Exam-Management");
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );
  }
  return (
    <PageContainer title="Login" description="this is Sample page">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh", backgroundColor: "white" }}
      >
        <LoginLeftSection />
        {/* <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          xl={6}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              // background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <AuthLogo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={"100vh"}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <Box
                p={4}
                position={"absolute"}
                sx={{
                  position: "absolute",
                  maxWidth: "calc(100% - 50px)",
                  width: "100%",
                  // display: {
                  //   xs: "none",
                  //   lg: "flex",
                  // },
                  zIndex: "999",
                  bottom: "25px",
                  // bgcolor:"blueviolet",
                  borderRadius: "0 0 20px 20px",
                  paddingTop: "100px",
                  background:
                    "linear-gradient(180deg, rgba(6, 96, 178, 0.00) 14.98%, #00305C 100%)",
                }}
              >
                <Typography
                  fontWeight="700"
                  variant="h2"
                  fontSize={{ xs: "24px", md: "28px", lg: "34px" }}
                  color={"#fff"}
                  mb={"12px"}
                  sx={{
                    lineHeight: "1.2",
                  }}
                >
                  PrepX: One Stop Solution <br />
                  for Operational Excellence!
                </Typography>
                <Typography
                  fontWeight="700"
                  variant="h3"
                  fontSize={{ xs: "17px", md: "18px", lg: "20px" }}
                  color={"#fff"}
                >
                  The Path for Growth &amp; Success
                </Typography>
              </Box>
              <Image
                src={"/images/login/login-image.png"}
                alt="bg"
                width={660}
                height={760}
                style={{
                  width: "100%",
                  maxWidth: "calc(100% - 50px)",
                  maxHeight: "calc(100vh - 50px)",
                  height: "calc(100vh - 50px)",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </Box>
          </Box>
        </Grid> */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          xl={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            p={4}
            sx={{
              width: {
                xs: "100%",
                md: "70%",
                lg: "56%",
              },
              maxWidth: "544px"
            }}
          >
            <AuthLogin
              title="Sign In"
              subtitle={<Stack direction="row" spacing={1} mt={3}></Stack>}
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

Login.layout = "Blank";
