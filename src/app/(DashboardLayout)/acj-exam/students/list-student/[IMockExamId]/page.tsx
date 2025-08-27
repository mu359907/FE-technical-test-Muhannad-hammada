"use client";
import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Typography,
  Card,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Link,
  TablePagination,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";

import { DeleteModalGraphic, PlusIcon, TrashIcon } from "@/components/Icons";
// import BlankCard from "../components/shared/BlankCard";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { IconRefresh, IconUpload, IconX } from "@tabler/icons-react";
import {
  getStudentList,
  deleteStudent,
} from "../../../../../../services/student/studentAPI";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import Loading from "../../../../../loading";
import { useRouter } from "next/navigation";
import { exportToExcel } from "../../../../../../utils/exportDataCommonFunction/index";
import toast from "../../../../components/Toast/index";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "#",
    title: "Exam",
  },
  {
    to: "/Exam-Management",
    title: "iMock Exam",
  },
  {
    title: "Students",
  },
];

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 3,
  [`& .delete-modal-graphic`]: { marginRight: "15px" },
};

export default function ImockExamQuestion({ params }: any) {
  const theme = useTheme();
  const iMockExamId = params?.IMockExamId;
  const router = useRouter();

  const [openModal, setOpenModal] = React.useState(false);
  const [studentData, setStudentData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [deleteSingleStudent, setDeleteSingleStudent] = useState<any>();
  const [orderBy, setOrderBy] = useState<any>("created_on DESC");
  const [search, setSearch] = useState<string | null>(null);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const getAllStudent = async () => {
    setIsLoading(true);
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      ascDesc: orderBy,
      imcok_exam_id: iMockExamId,
      // searchedKey: searchedKey != null ? searchedKey : [],
      search: search != null ? search : "",
    };
    await getStudentList(bodyData)
      .then((result) => {
        if (result?.success) {
          handleModalClose();
          setStudentData(result?.data);
        }
        handleModalClose();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        handleModalClose();
        setIsLoading(false);
      });
  };

  const getSearchedStudent = async () => {
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      ascDesc: orderBy,
      // searchedKey: searchedKey != null ? searchedKey : [],
      search: search != null ? search : "",
    };
    await getStudentList(bodyData)
      .then((result) => {
        if (result?.success) {
          setStudentData(result?.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (value: any) => {
    // Check if the checkbox value is already in the array
    const index = selectedCheckboxes.indexOf(value);

    if (index === -1) {
      // If not, add it to the array
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      // If yes, remove it from the array
      const updatedCheckboxes = [...selectedCheckboxes];
      updatedCheckboxes.splice(index, 1);
      setSelectedCheckboxes(updatedCheckboxes);
    }
  };

  const handleExportToExcel = () => {
    if (studentData?.results?.length > 0) {
      const columns = {
        "Student ID": "student_id",
        "Environment ID": "exam_assing_text_id",
        Location: "location_id_text",
        Email: "email",
        Created: "created_on",
      };
      exportToExcel(studentData?.results, columns, "student_data");
    } else {
      toast({ type: "warning", message: "Sorry, there is no data to be exported." });
    }
  };

  const handleDeleteStudent = async (id: any) => {
    let finalArray: any = [];
    if (id != null) {
      finalArray.push(id);
    } else {
      finalArray = selectedCheckboxes;
    }
    const bodyData = {
      imcok_exam_assing_id: finalArray,
    };
    await deleteStudent(bodyData)
      .then((result) => {
        if (result?.success) {
          setSelectedCheckboxes([]);
          getAllStudent();
        } else {
          setIsLoading(false);
          handleModalClose();
          toast({ type: "error", message: result?.message });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        handleModalClose();
        toast({ type: "error", message: "Sorry, something went wrong. Please try again." });
      });
  };

  useEffect(() => {
    getAllStudent();
  }, [page, rowsPerPage, orderBy]);

  useEffect(() => {
    if ((search as string)?.length > 3 || (search as string)?.length === 0) {
      getSearchedStudent();
    }
  }, [search, orderBy]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer title="iMock Exam" description="iMock Exam">
      {/* breadcrumb */}
      <Breadcrumb title="iMock Exam" items={BCrumb} />
      <Card
        sx={{
          padding: 3,
          backgroundColor: "#fff",
          marginBottom: "25px",
          overflow: "visible",
        }}
      >
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          position={"relative"}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <CustomTextField
              id=""
              variant="outlined"
              fullWidth
              placeholder={"Search Student"}
              //   onChange={(event: any) => setSearch(event?.target.value)}
              value={search != null ? search : ""}
              //   onFocus={() => setFocus(true)}
              // onBlur={() => setFocus(false)}
              sx={{
                maxWidth: "100%",
              }}
              onChange={(event: any) => setSearch(event.target.value)}
            />
          </Box>
          <Button
            component={Link}
            onClick={() =>
              router.push(`/Exam-Management/students/assign-student/${iMockExamId}`)
            }
            sx={{
              borderRadius: "6px",
              color: "white",
              display: "flex",
              gap: "6px",
              padding: "4px 18px",
            }}
          >
            <PlusIcon />
            <span>Assign</span>
          </Button>
          <Button
            sx={{
              borderRadius: "6px",
              color: "#000",
              padding: "6px 0",
              minWidth: "48px",
              background: "transparent",
              "&:hover": {
                color: "#000",
                backgroundColor: "#EEE",
              },
            }}
            onClick={() => handleExportToExcel()}
          >
            <IconUpload />
          </Button>
          <Button
            sx={{
              borderRadius: "50%",
              color: "#000",
              padding: "5px",
              width: "42px",
              height: "42px",
              minWidth: "42px",
              backgroundColor: "#EEE",
              "&:hover": {
                color: "#000",
                backgroundColor: "#EEE",
              },
            }}
            onClick={() => getAllStudent()}
          >
            <IconRefresh />
          </Button>
        </Stack>
      </Card>

      <BlankCard>
        <TableContainer>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "24px" }}>
                  <Typography
                    variant="h6"
                    component={"span"}
                    fontWeight={600}
                  ></Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    component={"span"}
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Student ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    component={"span"}
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Environment ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    component={"span"}
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Location
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    component={"span"}
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    component={"span"}
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData?.results?.map((tdata: any) => (
                <TableRow key={tdata.id}>
                  <TableCell>
                    <Stack direction="row">
                      <Box>
                        <CustomCheckbox
                          //   defaultChecked
                          color="primary"
                          inputProps={{
                            "aria-label": "checkbox with default color",
                          }}
                          onChange={() =>
                            handleChange(tdata.imcok_exam_assing_id)
                          }
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      component={"span"}
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      STU{tdata.student_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      component={"span"}
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      {tdata.exam_assing_text_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      {tdata.location_id_text}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      component={"span"}
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      {tdata.email}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Link
                        color="#FC4B6C"
                        onClick={() => {
                          handleModalOpen();
                          setDeleteSingleStudent(tdata.imcok_exam_assing_id);
                        }}
                      >
                        <TrashIcon />
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <>
            {selectedCheckboxes?.length > 0 && (
              <Box
                px={3.3}
                py={2}
                sx={{
                  borderTop: "1px solid #e5eaef",
                }}
              >
                <Link
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#FC4B6C",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onClick={() => handleDeleteStudent(null)}
                >
                  <TrashIcon />{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#67757C",
                      lineHeight: "1",
                    }}
                  >
                    Delete Selected
                  </Box>
                </Link>
              </Box>
            )}
          </>
        </TableContainer>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={styleModal}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Button
              onClick={handleModalClose}
              sx={{
                position: "absolute",
                top: "8px",
                right: "8px",
                borderRadius: "5px",
                color: "#fff",
                padding: "3px",
                width: "22px",
                height: "22px",
                minWidth: "0",
                lineHeight: "1",
                textAlign: "center",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  color: "#fff",
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <IconX size={"1rem"} />
            </Button>
            <DeleteModalGraphic className="delete-modal-graphic" />
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h3"
              color={theme.palette.primary.main}
              textAlign={"center"}
              mt={2}
            >
              Delete File
            </Typography>
            <Typography
              id="modal-modal-description"
              textAlign={"center"}
              sx={{ mt: 1, opacity: ".7", fontSize: "15px" }}
            >
              Are You sure You want to delete.
            </Typography>
            <Box
              p={"20px 25px 5px"}
              display={"flex"}
              gap={"12px"}
              justifyContent={"center"}
            >
              <Button
                sx={{
                  borderRadius: "5px",
                  color: "#67757C",
                  backgroundColor: "#99ABB433",
                  padding: "7px 25px",
                  minWidth: "90px",
                  "&:hover": {
                    color: "#67757C",
                    backgroundColor: `#99ABB433`,
                  },
                }}
                onClick={handleModalClose}
              >
                No
              </Button>
              <Button
                sx={{
                  borderRadius: "5px",
                  color: "#fff",
                  backgroundColor: theme.palette.primary.main,
                  padding: "7px 25px",
                  minWidth: "90px",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                onClick={() => handleDeleteStudent(deleteSingleStudent)}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={studentData?.totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </BlankCard>
    </PageContainer>
  );
}
