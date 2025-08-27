import theme from "@/utils/theme";
import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  StepOneIcon,
  StepTwoIcon,
  StepThreeIcon,
  StepFourIcon,
  StepFiveIcon,
} from "../Icons";
interface ExamWizardStepsProps {
  step: any;
  examid?: any;
}
const ExamWizardSteps: React.FC<ExamWizardStepsProps> = ({ step, examid }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      mt={4}
      mb={7}
      //   sx={{
      //     position: "relative",
      //     "&::before": {
      //       position: "absolute",
      //       content: '""',
      //       display: "block",
      //       height: "2px",
      //       left: "21%",
      //       right: "21%",
      //       bottom: "calc(100% - 68.4px)",
      //       marginTop: "10px",
      //       zIndex: "-2",
      //       background: "#EBEBEB",
      //     },
      //     "&::after": {
      //       position: "absolute",
      //       content: '""',
      //       display: "block",
      //       height: "2px",
      //       left: "20.5%",
      //       right: "65%",
      //       bottom: "calc(100% - 68.4px)",
      //       marginTop: "10px",
      //       zIndex: "0",
      //       background: "transparent",
      //     },
      //   }}
    >
      <Grid
        container
        spacing={0}
        mt={4}
        sx={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
        justifyContent={"center"}
      >
        <Grid
          xs={3}
          sx={{
            textAlign: "center",
            cursor: "pointer",
            color: theme.palette.primary.main,
            position: "relative",
            "&::after": {
              position: "absolute",
              content: '""',
              display: "block",
              height: "2px",
              bottom: "calc(100% - 68.4px)",
              zIndex: 0,
              background: `${
                step > 0 ? theme.palette.primary.main : "#E3E8EA"
              }`,
              width: "100%",
              left: "50%",
            },
          }}
        >
          <Link
            onClick={() => {
              // handleStationCreate(stationMange);
              examid ? router.push(`/acj-exam/edit-acj-exam/${examid}`) : "";
            }}
            sx={{
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                border: "solid 3px transparent",
                borderColor: theme.palette.primary.main,
                color: "white",
                background: theme.palette.primary.main,
                margin: "0 auto",
                position: "relative",
                "& svg path": {
                  fill: theme.palette.mode === "light" ? "#fff" : "#fff",
                },
                "&::before": {
                  position: "absolute",
                  content: '""',
                  display: "block",
                  height: "10px",
                  top: "calc(100% + 15px)",
                  zIndex: 1,
                  background: `${
                    step >= 0 ? theme.palette.primary.main : "#E3E8EA"
                  }`,
                  width: "10px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <StepOneIcon />
            </Box>
          </Link>
          <Typography
            variant="h5"
            component={"h4"}
            mt={1}
            color={theme.palette.primary.main}
            fontSize={"15px"}
            textAlign={"center"}
            marginTop={"30px"}
          >
            Create New Session
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{
            textAlign: "center",
            color: theme.palette.primary.main,
            position: "relative",
            "&::after": {
              position: "absolute",
              content: '""',
              display: "block",
              height: "2px",
              bottom: "calc(100% - 68.4px)",
              zIndex: 0,
              background: `${
                step > 1 ? theme.palette.primary.main : "#E3E8EA"
              }`,
              width: "100%",
              left: "50%",
            },
          }}
        >
          <Link
            onClick={() => {
              // handleStationCreate(stationMange);
              examid
                ? router.push(`/acj-exam/question-selection?examid=${examid}`)
                : "";
            }}
            sx={{
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                border: "solid 3px transparent",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                margin: "0 auto",
                position: "relative",
                background: `${
                  step >= 1 ? theme.palette.primary.main : "transparent"
                }`,
                "& svg path": {
                  fill: `${
                    step >= 1
                      ? theme.palette.mode === "light"
                        ? "#fff"
                        : "#fff"
                      : ""
                  }`,
                },
                "&::before": {
                  position: "absolute",
                  content: '""',
                  display: "block",
                  height: "10px",
                  top: "calc(100% + 15px)",
                  zIndex: 1,
                  background: `${
                    step >= 1 ? theme.palette.primary.main : "#E3E8EA"
                  }`,
                  width: "10px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <StepThreeIcon />
            </Box>
          </Link>
          <Typography
            variant="h5"
            component={"h4"}
            mt={1}
            color={theme.palette.primary.main}
            fontSize={"15px"}
            textAlign={"center"}
            marginTop={"30px"}
          >
            Question Selection
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{
            textAlign: "center",
            color: theme.palette.primary.main,
            position: "relative",
            "&::after": {
              position: "absolute",
              content: '""',
              display: "block",
              height: "2px",
              bottom: "calc(100% - 68.4px)",
              zIndex: 0,
              background: `${
                step > 2 ? theme.palette.primary.main : "#E3E8EA"
              }`,
              width: "100%",
              left: "50%",
            },
          }}
        >
          <Link
            onClick={() => {
              // handleStationCreate(stationMange);
              examid
                ? router.push(`/acj-exam/assign-trainee?examid=${examid}`)
                : "";
            }}
            sx={{
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                border: "solid 3px transparent",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                margin: "0 auto",
                position: "relative",
                background: `${
                  step >= 2 ? theme.palette.primary.main : "transparent"
                }`,
                "& svg path": {
                  fill: `${
                    step >= 2
                      ? theme.palette.mode === "light"
                        ? "#fff"
                        : "#fff"
                      : ""
                  }`,
                },
                "&::before": {
                  position: "absolute",
                  content: '""',
                  display: "block",
                  height: "10px",
                  top: "calc(100% + 15px)",
                  zIndex: 1,
                  background: `${
                    step >= 2 ? theme.palette.primary.main : "#E3E8EA"
                  }`,
                  width: "10px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <StepFourIcon />
            </Box>
          </Link>
          <Typography
            variant="h5"
            component={"h4"}
            mt={1}
            color={theme.palette.primary.main}
            fontSize={"15px"}
            textAlign={"center"}
            marginTop={"30px"}
          >
            Assign Trainees
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{
            textAlign: "center",
            color: theme.palette.primary.main,
            position: "relative",
          }}
        >
          <Link
            onClick={() => {
              // handleStationCreate(stationMange);
              examid
                ? router.push(`/acj-exam/review-details?examid=${examid}`)
                : "";
            }}
            sx={{
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                border: "solid 3px transparent",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                margin: "0 auto",
                position: "relative",
                background: `${
                  step >= 3 ? theme.palette.primary.main : "transparent"
                }`,
                "& svg path": {
                  fill: `${
                    step >= 3
                      ? theme.palette.mode === "light"
                        ? "#fff"
                        : "#fff"
                      : theme.palette.primary.main
                  }`,
                },
                "&::before": {
                  position: "absolute",
                  content: '""',
                  display: "block",
                  height: "10px",
                  top: "calc(100% + 15px)",
                  zIndex: 1,
                  background: `${
                    step >= 3 ? theme.palette.primary.main : "#E3E8EA"
                  }`,
                  width: "10px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <StepFiveIcon />
            </Box>
          </Link>
          <Typography
            variant="h5"
            component={"h4"}
            mt={1}
            color={theme.palette.primary.main}
            fontSize={"15px"}
            textAlign={"center"}
            marginTop={"30px"}
          >
            Review Details
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExamWizardSteps;
