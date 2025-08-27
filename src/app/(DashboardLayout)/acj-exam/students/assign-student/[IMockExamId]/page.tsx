"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";

import {
  Button,
  Card,
  Box,
  Stack,
  Grid,
  CardContent,
  MenuItem,
  Link,
  Autocomplete,
  FormHelperText,
} from "@mui/material";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useTheme } from "@mui/material/styles";
import StudentAutocomplete from "../StudentAutocomplete";
import { useRouter } from "next/navigation";
import { getLocationList, getAvailableStudentList, assignStudent} from "../../../../../../services/student/studentAPI"
import Loading from "../../../../../loading";
import CustomCheckbox from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox';
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "../../../../components/Toast/index";


export default function CreateStudent({params}: any) {
  const [selectLocation, setSelectLocation] = useState();
  const [selectLocationData, setSelectLocationData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locationData, setLocationData] = useState<any>();
  const [studentData, setStudentData] = useState<any>();
  const [selectedStudents, setSelectedStudents] = useState<any>([]);
  const iMockExamId = params?.IMockExamId;
  const router = useRouter();

  const validationSchema = yup.object({
    location_id: yup.string().required("Location is required")
  });
  const formik = useFormik({
    initialValues: {
      imcok_exam_id: "",
      location_id: "",
      student_id: [],
      status: 1
    },
    validationSchema,
    onSubmit: async (values: any) => {
      values.imcok_exam_id = iMockExamId
      if (selectedStudents?.length == 0) {
        return; // Exit the function early if no images are selected
      }
      setIsLoading(true);

      try {
        const result = await assignStudent(values);
        if (result?.success) {
          toast({ type: "success", message: "Trainee has been assign successfully" });
          router.push(`/Exam-Management/students/list-student/${iMockExamId}`);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        toast({ type: "error", message: "Sorry, something went wrong. Please try again." });
        setIsLoading(false);
        console.log("error: ", error);
      }
    },
  });

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
      to: `/Exam-Management/students/list-student/${iMockExamId}`,
      title: "Students",
    },
    {
      title: "Assign Student",
    },
  ];

  const handleChangeLocationDropDown = (event: any) => {
    const locationIdData = locationData?.find(
      (locationData: any) => locationData.location_id == event.target.value
    );
    setSelectLocationData(locationIdData);
    setSelectLocation(event.target.value);
    formik.setFieldValue("location_id", event.target.value);
  };

  const theme = useTheme();

  const getLocations = async () => {
    setIsLoading(true);
    await getLocationList(iMockExamId)
      .then((result) => {
        if (result?.success) {
          setLocationData(result?.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  const getStudentList = async () => {
    setIsLoading(true);
    await getAvailableStudentList(iMockExamId)
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

   // Handle change for location dropdown
   const handleStudentChange = (studentValue: any) => {
    const studentIds = studentValue?.map(
      (student: any) => student.id
    );
    setSelectedStudents(studentIds);
    formik.setFieldValue("student_id", studentIds);
  };

  useEffect(() => {
    getLocations();
    getStudentList();
  }, []);



  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer title="Create iMock Exam" description="Create iMock Exam">
      {/* breadcrumb */}
      <Breadcrumb title="Create iMock Exam" items={BCrumb} />
      <Card
        sx={{
          padding: "8px 24px 24px",
          backgroundColor: "#fff",
          marginBottom: "25px",
          boxShadow: "0 10px 10px rgba(0,0,0,0.02)",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Box>
                    <CustomFormLabel
                      htmlFor="selectlocation"
                      sx={{
                        marginTop: "0",
                        color: "#67757C",
                        fontWeight: 400,
                        fontSize: "15px",
                      }}
                    >
                      Location
                    </CustomFormLabel>
                    <CustomSelect
                      id="selectlocation"
                      value={selectLocation}
                      onChange={handleChangeLocationDropDown}
                      fullWidth
                      variant="outlined"
                      displayEmpty
                    >
                      <MenuItem defaultValue="" disabled>
                        Select location
                      </MenuItem>
                      {locationData?.map((option: any) => (
                        <MenuItem
                          key={option.location_id}
                          value={option.location_id}
                        >
                          {option.location_name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    {formik.touched.location_id &&
                      formik.errors.location_id && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-email-login"
                        >
                          {typeof formik.errors.location_id === "string"
                            ? formik.errors.location_id
                            : "An error occurred"}
                        </FormHelperText>
                      )}
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Box>
                    <CustomFormLabel
                      htmlFor="firstName"
                      sx={{
                        color: "#67757C",
                        marginTop: "0",
                        fontWeight: 400,
                        fontSize: "15px",
                      }}
                    >
                      Station
                    </CustomFormLabel>
                    <CustomTextField
                      id=""
                      variant="outlined"
                      fullWidth
                      value={selectLocationData?.stationCount}
                      placeholder={""}
                      disabled
                      sx={{
                        // color: "#67757C",
                        [`& .MuiInputBase-input`]: {
                          backgroundColor: "#F5F7F8",
                          borderRadius: "5px",
                        },
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack>
                  <Box>
                    {studentData && studentData?.length > 0 &&
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={studentData}
                      disableCloseOnSelect
                      getOptionLabel={(option: any) => option.displayname}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <CustomCheckbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.firstname} {option.lastname}
                        </li>
                      )}
                      fullWidth
                      onChange={(event, value) => {
                        handleStudentChange(value);
                      }}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          placeholder="Search Student"
                          aria-label="search-student"
                        />
                      )}
                      sx={{
                        [`& .MuiChip-filled`]: {
                          padding: "0",
                          fontSize: "15px",
                          fontWeight: 400,
                          backgroundColor: "rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    />
                    }
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Box display={"flex"} gap={"12px"} justifyContent={"left"}>
                <Button
                  sx={{
                    borderRadius: "5px",
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 25px",
                    minWidth: "150px",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  component={Link}
                  onClick={() => router.back()}
                  sx={{
                    borderRadius: "5px",
                    color: "#67757C",
                    backgroundColor: "#99ABB433",
                    padding: "8px 25px",
                    "&:hover": {
                      color: "#67757C",
                      backgroundColor: `#99ABB433`,
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </CardContent>
        </form>
      </Card>
    </PageContainer>
  );
}
