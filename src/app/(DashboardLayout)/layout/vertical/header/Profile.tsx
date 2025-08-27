import React, { useEffect, useState } from "react";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  useTheme,
  Link,
} from "@mui/material";
import { Stack } from "@mui/system";
// Removed authentication imports
import axios from "axios";
import { useRouter } from "next/navigation";
// Removed useDataContext import
import { primaryButon, secondaryButon } from "@/utils/commonstyles";
import { BooksIcon, CogIcon, CogdIcon, MoonIcon } from "@/components/Icons";
import { setDarkMode } from "@/store/customizer/CustomizerSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  // Removed hostName context - no longer needed
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl2, setAnchorEl2] = useState(null);

  // Mock user data since authentication is removed
  const userName = "Admin User";
  const userFullName = "Administrator";
  const mailId = "admin@example.com";
  const UserMedia = null;

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logOut = async () => {
    // Clear any local storage and redirect
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }

    // Since authentication is removed, just redirect to admin dashboard
    router.push("/Exam-Management");
  };
  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme.palette.mode === "dark");
    document.body.classList.toggle(
      "light-mode",
      theme.palette.mode === "light"
    );
  }, [theme]);
  return (
    <Box>
      <IconButton onClick={handleClick2}>
        <Avatar
          src={UserMedia ? UserMedia : "/images/profile/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 40,
            height: 40,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "256px",
            p: "24px",
            background: theme.palette.background.light,
            boxShadow: "2px 2px 10px rgba(153, 153, 153, 0.1)",
            borderRadius: "15px",
          },
        }}
      >
        <Stack direction="row" pb={"15px"} spacing={2} alignItems="center">
          <Avatar
            src={UserMedia ? UserMedia : "/images/profile/user2.jpg"}
            alt={"ProfileImg"}
            sx={{ width: 35, height: 35 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.secondary.textColorOther}
              fontWeight={400}
              sx={{
                fontSize: "14px",
              }}
            >
              {userName}
            </Typography>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.primary}
              fontWeight={400}
              sx={{
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "90%",
              }}
            >
              {mailId}
            </Typography>
            {/* <Typography variant="subtitle2" color="textSecondary">
          Designer
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <IconMail width={15} height={15} />
          info@prepdoctors.com
        </Typography> */}
          </Box>
        </Stack>
        {false && (
          <>
            <Divider
              sx={{
                borderColor: "#738A9633",
              }}
            />
            <Stack py={"15px"} direction={"column"} gap={"18px"}>
              <Link
                sx={{
                  color: theme.palette.text.primary,
                  textDecoration: "none",
                  "& svg": {
                    width: "20px",
                  },
                  "& svg path": {
                    stroke: `${theme.palette.mode === "light" ? "#4F595F" : "#D8D8D8"
                      }`,
                  },
                }}
              >
                <Typography
                  variant="body3"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <BooksIcon />
                  My Studies
                </Typography>
              </Link>
            </Stack>
          </>
        )}
        <Divider
          sx={{
            borderColor: "#738A9633",
          }}
        />
        <Stack py={"15px"} direction={"column"} gap={"10px"}>
          {theme.palette.mode === "dark" ? (
            <Link
              sx={{
                width: "100%",
                color: theme.palette.text.primary,
                textDecoration: "none",
                cursor: "pointer",
                "& svg": {
                  width: "20px",
                },
                "& svg path": {
                  stroke: `${theme.palette.mode === "light" ? "#4F595F" : "#D8D8D8"
                    }`,
                },
              }}
              onClick={() => dispatch(setDarkMode("light"))}
            >
              <Typography
                variant="body3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <MoonIcon />
                Light Mode
              </Typography>
            </Link>
          ) : (
            <Link
              sx={{
                width: "100%",
                color: theme.palette.text.primary,
                textDecoration: "none",
                cursor: "pointer",
                "& svg": {
                  width: "20px",
                },
                "& svg path": {
                  stroke: `${theme.palette.mode === "light" ? "#4F595F" : "#D8D8D8"
                    }`,
                },
              }}
              onClick={() => dispatch(setDarkMode("dark"))}
            >
              <Typography
                variant="body3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <MoonIcon />
                Dark Mode
              </Typography>
            </Link>
          )}
        </Stack>
      </Menu>
    </Box>
  );
};

export default Profile;
