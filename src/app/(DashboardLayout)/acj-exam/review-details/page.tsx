"use client";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import {
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { PhoneIcon } from "@/components/Icons";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import { stationList } from "../stations";
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import CustomTablePagination from "@/components/CustomPagination";
import usePagination2 from "@/hooks/usePagination2";
import { PAGINATION } from "@/utils/Constants";
import toast from "../../components/Toast/index";

const { DEFAULT_TOTAL_PAGE, DEFAULT_PAGE } = PAGINATION;

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/Exam-Management",
    title: "Assessment Module",
  },
  {
    title: "Exam Management",
  },
];

const timezones = [
  {
    id: "1",
    label: "EST",
  },
  {
    id: "2",
    label: "GMT",
  },
  {
    id: "3",
    label: "PST",
  },
];

// get iMock exam by Id

const ReviewDetails = () => {
  // alert("ReviewDetails");
  const router = useRouter();
  const searchRouter = useSearchParams();
  const theme = useTheme();
  const examId: any = searchRouter.get("examid");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [iMockExamData] = useState<any>();
  const [selectedStudentData] = useState<any>({ results: [], totalPages: 0, totalRecords: 0 });
  const [selectedQuestionData] = useState<any>({ results: [], totalPages: 0, totalRecords: 0 });
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2();
  const localUserTimeZone = 'America/Toronto';

  const {
    setPage: setPage1,
    page: page1,
    setRowsPerPage: setRowsPerPage1,
    rowsPerPage: rowsPerPage1,
    handlePagination: handlePagination1,
  } = usePagination2();




  /**
   * @ Function Name      : handleChangeRowsPerPage
   * @ Function Purpose   : To change page size
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  /**
   * @ Function Name      : handleChangePage
   * @ Function Purpose   : For change page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * @ Function Name      : handleChangeRowsPerPage
   * @ Function Purpose   : To change page size
   */
  const handleChangeRowsPerPage1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  /**
   * @ Function Name      : handleChangePage
   * @ Function Purpose   : For change page
   */
  const handleChangePage1 = (event: unknown, newPage: number) => {
    setPage1(newPage);
  };


  const countTotalAddedTrainee = (id: any) => {
    let count = 0;
    selectedStudentData?.forEach((item: any) => {
      if (item.CampusID == id) {
        count++;
      }
    });
    return count;
  };

  const getTimeZone = (TimeZoneID: any) => {
    const zone = timezones?.find(
      (timeZoneData: any) => timeZoneData.id == TimeZoneID
    );
    return zone?.label;
    // setTimeZone(zone)
  };

  const getStationNameById = (id: any) => {
    const stationData = stationList?.find(
      (stationData: any) => stationData.value == id
    );
    return stationData?.label;
  };

  const updateExamDataStatus = async () => {
    if (selectedQuestionData.totalRecords == 0) {
      toast({
        type: "error",
        message: "Please select a Question for the exam",
      });
      return;
    }
    try {
      setIsLoading(true);
      // let detailsArray: any = [];
      // detailsArray = selectedStudentData?.map((data: any, index: any) => ({
      //   LocationID: data?.CampusID,
      //   StudentID: data?.StudentID,
      //   ExamID: data?.ExamID,
      //   CampusOrderNumber: index + 1,
      //   StudentTextID: data?.StudentIDText,
      // }));

      const bodyData = {
        Status: 1,
      };
      // const reviewBody = {
      //   ExamID: examId,
      //   examReviewDetails: detailsArray,
      // };
      // const reviewData = await createExamReviewDetail(reviewBody);
      const result = await updateIMockExamStatus(examId, bodyData);
      if (result?.success) {
        router.push("/Exam-Management");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error: ", error);
    }
  };



  if (isLoading) {
    return <Loading />;
  }
  return (
    <PageContainer title="Review Details" description="Review Details">
      <ExamWizardSteps step={3} examid={examId} />
      {/* breadcrumb */}
      <Breadcrumb title="Review Details" items={undefined} />

      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>PrepX ID</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Number</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Name</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Type</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Created</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Date and Time of Exam</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Due Date and Time</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell colSpan={10}>
                    <Stack>
                      <Typography variant="h6">Exam details should go here</Typography>
                    </Stack>
                  </TableCell>
                  {/* <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {iMockExamData?.ExamIDText}
                  </TableCell>

                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {iMockExamData?.ExamIDText}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {iMockExamData?.ExamName}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {iMockExamData?.ExamTypeName}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {iMockExamData?.CreatedOn
                      ? moment(iMockExamData?.CreatedOn).format("MM-DD-YYYY")
                      : ""}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {iMockExamData?.ExamAvailabilityDate
                      ? moment
                        .tz(iMockExamData?.ExamAvailabilityDate, localUserTimeZone)
                        .format("YYYY-MM-DD hh:mm A z") : "-"}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {iMockExamData?.ExamDueDate
                      ? moment
                        .tz(iMockExamData?.ExamDueDate, localUserTimeZone)
                        .format("YYYY-MM-DD hh:mm A z") : "-"}
                  </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() => router.push(`/acj-exam/edit-acj-exam/${examId}`)}
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* Trainee block */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Trainee ID</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Trainee Name</span>
                    </Typography>
                  </TableCell>

                  {/* <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                      >
                        
                        <span>Status</span>
                      </Typography>
                    </TableCell> */}
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Type</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Email</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Location</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>LMS ID</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={10}>
                    <Stack>
                      <Typography variant="h6">Trainee details should go here</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
                {selectedStudentData?.results?.map((item: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.UserRoleTextID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.UserTitleName}
                    </TableCell>
                    {/* <TableCell
                          sx={{
                            paddingLeft: 0,
                            borderBottom: 0,
                            fontSize: "15px",
                            color:
                            theme.palette.mode === "light" ? "#52585D" : "#fff",
                            fontWeight: 400,
                          }}
                        >
                          {item.StudentStatus === 1 ? "Active" : "Incative"}
                        </TableCell> */}
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {iMockExamData?.ExamTypeName}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.UserEmail || '-'}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.CampusName}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color: theme.palette.secondary.fieldText,
                        fontWeight: 400,
                      }}
                    >
                      <Stack
                        gap={"10px"}
                        alignItems={"center"}
                        display={"flex"}
                        direction={"row"}
                        color={theme.palette.primary.main}
                        sx={{
                          "& svg path": {
                            fill: `${theme.palette.primary.main} !important`,
                          },
                        }}
                      >
                        {/* <PhoneIcon />{" "} */}
                        {/* <Link
                          sx={{
                            color: theme.palette.primary.main,
                            textDecorationColor: theme.palette.primary.main,
                          }}
                        >
                        </Link> */}
                        {item.LMSOrgDefinedId || '-'}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CustomTablePagination
              totalPageCount={selectedStudentData?.totalPages}
              totalRecords={selectedStudentData?.totalRecords}
              currentPage={page}
              rowsPerPage={rowsPerPage}
              handlePagination={handlePagination}
            />
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() =>
              router.push(`/acj-exam/assign-trainee?examid=${examId}`)
            }
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* station details */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Question ID</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Booklet</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Course Type</span>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Topic</span>
                    </Typography>
                  </TableCell>
                  {/* <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                      >
                        
                        <span>Chapter</span>
                      </Typography>
                    </TableCell> */}
                  {/* <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                      >
                        
                        <span>Section</span>
                      </Typography>
                    </TableCell> */}
                  {/* <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                      >
                        
                        <span>Slide</span>
                      </Typography>
                    </TableCell> */}
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Status</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={10}>
                    <Stack>
                      <Typography variant="h6">Question details should go here</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
                {selectedQuestionData?.results.map((item: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.QuestionTextID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.BookletID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.CourseTypeName}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.QuestionTopicName}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.ExamQuestionStatus == 1 ? "Active" : "Removed"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CustomTablePagination
              totalPageCount={selectedQuestionData?.totalPages}
              totalRecords={selectedQuestionData?.totalRecords}
              currentPage={page1}
              rowsPerPage={rowsPerPage1}
              handlePagination={handlePagination1}
            />
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() =>
              router.push(`/acj-exam/question-selection?examid=${examId}`)
            }
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* Location details */}
      {/* {iMockExamData?.ExamTypeName == "Mock" ? (
        <Card sx={commonContentCardStyle}>
          <Stack>
            <TableContainer>
              <Table
                aria-label="simple table"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                        variant="h6"
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        component={"p"}
                        fontWeight={400}
                      >
                        <span>Seats</span>
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                        variant="h6"
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        component={"p"}
                        fontWeight={400}
                      >
                        <span>Date</span>
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                        variant="h6"
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        component={"p"}
                        fontWeight={400}
                      >
                        <span>Time</span>
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                        variant="h6"
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        component={"p"}
                        fontWeight={400}
                      >
                        <span>Country</span>
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                      }}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                        variant="h6"
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        component={"p"}
                        fontWeight={400}
                      >
                        <span>Campus</span>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {saveExamData?.results?.map((item: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color:
                            theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.CampusIDCount}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color:
                            theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {moment(item?.ExamCampusDateTime).format("MMM-DD-YYYY")}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color:
                            theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {moment.utc(item?.ExamCampusDateTime).format("hh:mm A")}{" "}
                        {item?.GoogleTimezone}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color:
                            theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.CountryName}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color:
                            theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.CampusName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>
      ) : (
        <span></span>
      )} */}

      <Stack
        display={"flex"}
        direction={"row"}
        gap={"10px"}
        justifyContent={"flex-end"}
      >
        {/* {iMockExamData?.Status != 1 && ( */}
        <Button
          sx={{
            ...primaryButon,
          }}
          onClick={() => updateExamDataStatus()}
        >
          Publish
        </Button>
        {/* )} */}
        {/* <Button
          sx={{
            ...primaryButon,
            p: "9px 16px",
            width: "fit-content",
            background: theme.palette.secondary.textColor,
            "&:disabled": {
              background: "#738A9633",
              borderColor: "#738A9633",
            },
            "&:hover": {
              background: theme.palette.secondary.textColor,
            },
          }} */}
        {/* onClick={() => router.push(`/situational-timer/${examId}`)} */}
        {/* >
          Start Session
        </Button> */}
      </Stack>
    </PageContainer>
  );
};

export default ReviewDetails;
