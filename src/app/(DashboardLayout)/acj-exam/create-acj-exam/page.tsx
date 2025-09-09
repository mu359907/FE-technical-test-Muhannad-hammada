"use client"
import { useEffect, useRef, useState } from "react"
import { Button, Card, Box, Stack, MenuItem } from "@mui/material"
import { v4 as uuidv4 } from "uuid"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer"
import { useTheme } from "@mui/material/styles"

import { Dayjs } from "dayjs"
import { getExamTypeList } from "../../../../services/examType/examTypeAPI"
import { useFormik } from "formik"
import moment from "moment-timezone"
import toast from "../../components/Toast"
import Loading from "../../loading"
import { useRouter, useSearchParams } from "next/navigation"
import CommonPopup from "../../../../utils/commonpopup/index"
import React from "react"
import {
  commonContentCardStyle,
  fieldLabel,
  primaryButon,
  secondaryButon
} from "@/utils/commonstyles"
import ExamWizardSteps from "@/components/ExamWizardSteps"
import { gradeCalculation } from "../dropDowns"
import { getCampusList } from "@/services/station/stationAPI"
import { createNewExam } from "../../../../services/newExamFlow/newExamFlowAPI"
import {
  exampTypeSlugAllowed,
  mockExamSlug,
  quizzExamSlug,
  selfAssessmentExamSlug
} from "../constant"
import { getCourseLmsList } from "@/services/adminCourseDashboard/adminCourseDashboard"
import { PAGINATION } from "@/utils/Constants"
import FormFirstSection from "./components/FromFirstSection"
import AvailabilityDates from "./components/AvailabilityDates"
import ExamTime from "./components/ExamTime"
import { getValidationSchema } from "./validation"

const { DEFAULT_PAGE } = PAGINATION

const BCrumb = [
  {
    to: "/",
    title: "Home"
  },
  {
    to: "/Exam-Management",
    title: "Exam Management"
  },
  {
    title: "Create New Session"
  }
]

const MockexamLocationTypeData = [
  { selectid: 2, title: "On Site" },
  { selectid: 1, title: "Online" }
]

export default function CreateIMockExam() {
  const searchRouter = useSearchParams()
  const examCourse: any = searchRouter.get("examcourse")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedHour, setSelectedHour] = useState("10")
  const [selectedMinute, setSelectedMinute] = useState("00")
  const [selectedShift, setSelectedShift] = useState("AM")
  const [dateValue2, setDateValue2] = useState<Dayjs | null>(null)
  const [start, setStart] = useState<any | null>("10:00 AM")

  const [selectedHourDue, setSelectedHourDue] = useState("10")
  const [selectedMinuteDue, setSelectedMinuteDue] = useState("00")
  const [selectedShiftDue, setSelectedShiftDue] = useState("AM")
  const [dateValue2Due, setDateValue2Due] = useState<Dayjs | null>(null)
  const [startDue, setStartDue] = useState<any | null>("10:00 AM")
  const [numberOfQuestionError, setNumberOfQuestionError] = useState<any>(false)
  const [examType, setExamType] = useState<any>()
  const [examTypeData, setExamTypeData] = useState<any>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [checkBoxChecked, setCheckBoxChecked] = useState(false)
  const [isShuffleQuiz, setIsShuffleQuiz] = useState<any>(false)
  const [numberOfAttempt, setNumberOfAttempt] = useState<any>()
  const [numberOfPaging, setNumberOfPaging] = useState<any>()
  const [isTimeLimit, setIsTimeLimit] = useState<any>(false)
  const [selectedExamCourse, setSelectedExamCourse] = useState<any>(null)
  const [availabilityDateValue, setAvailabilityDateValue] =
    React.useState<Dayjs | null>(null)
  const [dueDateValue, setDueDateValue] = React.useState<Dayjs | null>(null)
  const [timeDropDownData, setTimeDropDownData] = useState<any>([])
  const [selectedCheckBoxIndex, setSelectedCheckBoxIndex] = useState<any>([])
  const [globalDateTime, setGlobalDateTime] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<any>(false)
  const [openPopoverId, setOpenPopoverId] = useState<string | null>()
  const open = Boolean(anchorEl)
  const id = open ? "time-popover" : undefined
  const textFieldRef = useRef<HTMLDivElement | null>(null)
  const availabilityFieldRef = useRef<HTMLDivElement | null>(null)
  const dueFieldRef = useRef<HTMLDivElement | null>(null)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  const [anchorElForStartTime, setAnchorElForStartTime] =
    useState<HTMLElement | null>(null)
  const [anchorElForDueTime, setAnchorElForDueTime] = useState<any>(false)

  const [startHour, setStartHour] = useState<any>("")
  const [startMinute, setStartMinute] = useState<any>("")
  const [startampm, setStartampm] = useState<any>("")
  const [dueHour, setDueHour] = useState<any>("")
  const [dueMinute, setDueMinute] = useState<any>("")
  const [dueampm, setDueampm] = useState<any>("")
  const [selectedCountry1, setSelectedCountry1] = useState(null)
  const [selectedTimeZone, setSelectedTimeZone] = useState<any>(null)

  const [countryName, setCountryName] = useState("")
  const [timeZone, setTimeZone] = useState("America/Toronto")
  const [isStartTimePopoverOpen, setIsStartTimePopoverOpen] = useState(false)
  const [isDueTimePopoverOpen, setIsDueTimePopoverOpen] = useState(false)
  const [mockOnlineAutoPublish, setMockOnlineAutoPublish] = useState<any>(false)
  const [isEvolution, setIsEvolution] = useState<any>()
  type CheckedItems = {
    [key: string]: boolean
  }
  const hours = Array.from({ length: 12 }, (_, i) => i + 1)

  const minutes = Array.from({ length: 60 / 5 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  )

  const ampm = ["AM", "PM"]

  const availabilityTimeChange = (type: string, value: string | number) => {
    switch (type) {
      case "hour":
        setStartHour(value)
        break
      case "minute":
        setStartMinute(value)
        break
      case "ampm":
        setStartampm(value)
        setIsStartTimePopoverOpen(false)
        break
      default:
        break
    }
  }

  const dueTimeChange = (type: string, value: string | number) => {
    switch (type) {
      case "hour":
        setDueHour(value)
        break
      case "minute":
        setDueMinute(value)
        break
      case "ampm":
        setDueampm(value)
        setIsDueTimePopoverOpen(false)
        break
      default:
        break
    }
  }

  const handleTimeChange = (
    key: string,
    value: string | number,
    rowId: string
  ) => {
    setRows((prevRows: any) => {
      const updatedRows = prevRows.map((row: any) => {
        if (row.id === rowId) {
          const newTime = { ...row.selectedTime, [key]: value }
          if (newTime.hour && newTime.minute && newTime.ampm) {
            const selectedTimeStr = `${newTime.hour}:${newTime.minute} ${newTime.ampm}`
            const newDateTime = addSelectedTimeToTimestamp(
              selectedTimeStr,
              globalDateTime
            )
            return {
              ...row,
              selectedTime: newTime,
              ExamCampusDateTime: newDateTime
            }
          }
          return { ...row, selectedTime: newTime }
        }
        return row
      })
      return updatedRows
    })

    if (key === "ampm") {
      handleClose(rowId)
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl((prev: any) => ({ ...prev, [rowId]: event.currentTarget }))
    setOpenPopoverId(rowId)
  }

  const availabilityClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForStartTime(event.currentTarget)
    setIsStartTimePopoverOpen(true)
    // setOpenPopover(true);
  }

  const handleClose = (rowId: string) => {
    setAnchorEl((prev: any) => ({ ...prev, [rowId]: null }))
    setOpenPopoverId(null)
  }

  const availabilityClose = () => {
    // setAnchorEl((prev) => ({ ...prev, [rowId]: null }));
    // setOpenPopover(null);
    setIsStartTimePopoverOpen(false)
    setAnchorElForStartTime(null)
  }

  const dueClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForDueTime(event.currentTarget)
    setIsDueTimePopoverOpen(true)
  }

  const dueClose = () => {
    setIsDueTimePopoverOpen(false)
    setAnchorElForDueTime(null)
  }

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
  const [countryData, setCountryData] = useState<any>()
  const [locationData, setLocationData] = useState<any>()
  const [examinationCourse, setExaminationCourse] = useState<any>([])
  const [originalCountryData, setOriginalCountryData] = useState<any>([])
  const [bookletValue, setBookletValue] = useState<any>("")
  const [isUnlimited, setIsUnlimited] = useState<any>(false)
  const [selectedCampuses, setSelectedCampuses] = useState<number[]>([])
  const [selectedGrade, setSelectedGrade] = useState(gradeCalculation[0].id)
  const [filteredTimeZones, setFilteredTimeZone] = useState<any>([])
  // const [selectedTimeZone, setSelectedTimeZone] = useState<any>();
  const [rows, setRows] = useState<any>([
    {
      id: uuidv4(),
      ExamCampusDateTime: null,
      CountryID: 0,
      CampusID: 0,
      CountryWiseTimeZoneID: 0,
      timezones: [],
      selectedTime: { hour: "", minute: "", ampm: "" }
    } //TimeZoneID: 0,
  ])
  const [locationDate, setLocationDate] = useState<number | null>(null)
  const handleModalClose = () => setOpenModal(false)
  const router = useRouter()
  const theme = useTheme()

  const validateFields = (values: any, rows: any, examType: any) => {
    if (examType?.ExamTypeSlug === mockExamSlug) {
      for (const item of rows) {
        for (const key in item) {
          if (
            item[key] == null ||
            item[key] === "" ||
            item[key] == undefined ||
            item[key] == 0
          ) {
            toast({
              type: "error",
              message: `Please fill out all of the mandatory fields.`
            })
            return false // Exit validation, return false to stop the process
          }
        }
        if (
          !item.selectedTime.hour ||
          !item.selectedTime.minute ||
          !item.selectedTime.ampm
        ) {
          toast({
            type: "error",
            message: `Please complete the time selection for all rows.`
          })
          return false
        }
      }
    }

    values.ExamNumberofQuestions = values.ExamNumberofQuestions || 1000

    values.PrepXExamAFKACJOSCECampus = rows.map((item: any) => {
      const { selectedTime, locations, timezones, id, ...rest } = item
      return rest
    })

    values.ExamCourseType = examCourse

    if (examType?.ExamTypeSlug === mockExamSlug) {
      values.ExamAvailabilityDate = locationDate
      values.ExamDueDate = locationDate
    } else if (values.ExamAvailabilityDate === "") {
      values.ExamAvailabilityDate = availabilityDateValue?.valueOf()
      values.ExamDueDate = dueDateValue?.valueOf()
    }

    if (examType?.ExamTypeSlug !== mockExamSlug) {
      if (startHour && startMinute && startampm && availabilityDateValue) {
        const date = moment(availabilityDateValue.valueOf()).tz(timeZone, true)
        let hour = startHour
        if (startampm === "PM" && hour < 12) {
          hour += 12
        } else if (startampm === "AM" && hour === 12) {
          hour = 0
        }
        const localDate = date.tz(timeZone).startOf("day")
        localDate.hour(hour)
        localDate.minute(startMinute)
        localDate.second(0)
        const updatedTimestamp = localDate.valueOf()
        values.ExamAvailabilityDate = updatedTimestamp
      }

      if (dueHour && dueMinute && dueampm && dueDateValue) {
        const date = moment(dueDateValue.valueOf()).tz(timeZone, true)
        let hour = dueHour
        if (dueampm === "PM" && hour < 12) {
          hour += 12
        } else if (dueampm === "AM" && hour === 12) {
          hour = 0
        }
        const localDate = date.tz(timeZone).startOf("day")
        localDate.hour(hour)
        localDate.minute(dueMinute)
        localDate.second(0)

        const updatedTimestamp = localDate.valueOf()
        values.ExamDueDate = updatedTimestamp
      }

      values.CountryID = 32
      values.TimeZoneID = 248
    }
    return true
  }

  const formik = useFormik({
    initialValues: {
      ExamName: "",
      PrepXExamAFKACJOSCECourse: "",
      ExamTypeID: "",
      Status: 0,
      ShortDescription: "",
      LongDescription: "",
      ExamBookletDuration: 1,
      ExamNumberofBookletsID: "",
      ExamBreakDuration: 1,
      ExamNumberofQuestions: 1,
      ExamSetTimeLimit: 0,
      ExamTimeLimit: 1,
      ExamQuizStart: 1,
      ExamTimeLimitExpires: 1,
      ExamAvailabilityDate: "",
      ExamDueDate: "",
      ExamShuffleQuiz: 0,
      ExamPaging: 0,
      ExamNumberofAttempts: "",
      ExamOverallGradeCalculationID: 1,
      ExamEvaluationFeedback: 0,
      ExamPublishedDisplayToLearners: 0,
      ExamAdditionallyID: 0,
      ExamInstructions: "",
      PrepXExamAFKACJOSCECampus: [],
      ExamCourseType: "",
      CSTimeOfExam: "",
      CSTimeOfExamDue: ""
    },
    // validationSchema,
    validationSchema: getValidationSchema(examType?.ExamTypeSlug, isUnlimited),
    onSubmit: async (values: any) => {
      if (numberOfQuestionError) {
        return
      }
      setIsLoading(true)
      if (!isTimeLimit) {
        values.ExamTimeLimit = 0
      }

      values.CountryID = 32
      values.TimeZoneID = 248
      values.ExamCourseType = examCourse
      values.ExamNumberofQuestions = values.ExamNumberofQuestions || 1000

      if (
        selectedHour &&
        selectedMinute &&
        selectedShift &&
        availabilityDateValue
      ) {
        // Set the timezone correctly and clone the dateValue2 to avoid mutating it
        const date = moment(availabilityDateValue.valueOf()).tz(timeZone, true)
        // Adjust hour based on the AM/PM shift
        let hour = +selectedHour
        if (selectedShift === "PM" && hour < 12) {
          hour += 12 // Convert PM hours to 24-hour format
        } else if (selectedShift === "AM" && hour === 12) {
          hour = 0 // Handle midnight as 0 hour in 24-hour format
        }

        // Set the time correctly based on the adjusted hour and minute
        const localDate = date.clone().tz(timeZone, true) // Clone the date object with timezone

        localDate.set({
          hour: hour,
          minute: +selectedMinute,
          second: 0
        })
        const updatedTimestamp = localDate.valueOf()
        values.ExamAvailabilityDate = updatedTimestamp
      }

      try {
        if (values.ExamQuizStart == 2) {
          const MomentExamAvailabilityDate = moment(values.ExamAvailabilityDate)
          let Edd = MomentExamAvailabilityDate.add(
            values.ExamTimeLimit,
            "minutes"
          )
          values.ExamNumberofAttempts = 1

          values.ExamDueDate = Edd.valueOf()
        } else {
          if (
            selectedHourDue &&
            selectedMinuteDue &&
            selectedShiftDue &&
            dueDateValue
          ) {
            // Set the timezone correctly and clone the dateValue2 to avoid mutating it
            const date = moment(dueDateValue.valueOf()).tz(timeZone, true)
            // Adjust hour based on the AM/PM shift
            let hour = +selectedHourDue
            if (selectedShiftDue === "PM" && hour < 12) {
              hour += 12 // Convert PM hours to 24-hour format
            } else if (selectedShiftDue === "AM" && hour === 12) {
              hour = 0 // Handle midnight as 0 hour in 24-hour format
            }

            // Set the time correctly based on the adjusted hour and minute
            const localDate = date.clone().tz(timeZone, true) // Clone the date object with timezone

            localDate.set({
              hour: hour,
              minute: +selectedMinuteDue,
              second: 0
            })
            const updatedTimestamp = localDate.valueOf()
            values.ExamDueDate = updatedTimestamp
          }
        }

        delete values.CSTimeOfExam
        delete values.CSTimeOfExamDue

        if (examType?.ExamTypeSlug === mockExamSlug) {
          values.ExamNumberofAttempts = 1
        }

        const result = await createNewExam(values)
        console.log("createNewExam result: ", result)
        if (result?.success) {
          debugger
          toast({
            type: "success",
            message: "Exam has been created successfully."
          })
          router.push(
            `/acj-exam/question-selection?examid=${result?.data?.ExamID}`
          )
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        toast({
          type: "error",
          message: "Sorry, something went wrong. Please try again."
        })
        setIsLoading(false)
        console.log("error: ", error)
      }
    }
  })

  //Calling to get exam type list API
  const getAllExamTypeList = async () => {
    setIsLoading(true)
    const bodyData = {
      limit: 100000000000000000,
      page: DEFAULT_PAGE
    }
    await getExamTypeList(bodyData)
      .then((result) => {
        if (result?.success) {
          const filteredData = result.data?.results.filter((examType: any) =>
            exampTypeSlugAllowed.includes(examType.ExamTypeSlug)
          )

          setExamTypeData(filteredData)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
        // setIsLoading(false);
      })
  }

  const populateOptions = (start: any, end: any) => {
    const options = []
    for (let i = start; i <= end; i++) {
      options.push(
        <MenuItem key={i} value={i < 10 ? "0" + i : i}>
          {i < 10 ? "0" + i : i}
        </MenuItem>
      )
    }
    return options
  }

  const handleMinuteChange = (event: any) => {
    setSelectedMinute(event.target.value)
    setStart(selectedHour + ":" + event.target.value + " " + selectedShift)
    formik.setFieldValue(
      "CSTimeOfExam",
      selectedHour + ":" + event.target.value + " " + selectedShift
    )
  }

  const handleShiftChange = (event: any) => {
    setSelectedShift(event.target.value)
    setStart(selectedHour + ":" + selectedMinute + " " + event.target.value)
    formik.setFieldValue(
      "CSTimeOfExam",
      selectedHour + ":" + selectedMinute + " " + event.target.value
    )
  }

  const handleHourChange = (event: any) => {
    setSelectedHour(event.target.value)
    setStart(event.target.value + ":" + selectedMinute + " " + selectedShift)
    formik.setFieldValue(
      "CSTimeOfExam",
      event.target.value + ":" + selectedMinute + " " + selectedShift
    )
  }

  const handleMinuteChangeDue = (event: any) => {
    setSelectedMinuteDue(event.target.value)
    setStartDue(
      selectedHourDue + ":" + event.target.value + " " + selectedShiftDue
    )
    formik.setFieldValue(
      "CSTimeOfExamDue",
      selectedHourDue + ":" + event.target.value + " " + selectedShiftDue
    )
  }

  const handleShiftChangeDue = (event: any) => {
    setSelectedShiftDue(event.target.value)
    setStartDue(
      selectedHourDue + ":" + selectedMinuteDue + " " + event.target.value
    )
    formik.setFieldValue(
      "CSTimeOfExamDue",
      selectedHourDue + ":" + selectedMinuteDue + " " + event.target.value
    )
  }

  const handleHourChangeDue = (event: any) => {
    setSelectedHourDue(event.target.value)
    setStartDue(
      event.target.value + ":" + selectedMinuteDue + " " + selectedShiftDue
    )
    formik.setFieldValue(
      "CSTimeOfExamDue",
      event.target.value + ":" + selectedMinuteDue + " " + selectedShiftDue
    )
  }

  const handleSetUnlimited = (event: any) => {
    setIsUnlimited(event.target.checked)
    formik.setFieldValue("ExamNumberofAttempts", "")
    if (event.target.checked == true) {
      formik.setErrors({
        ...formik.errors,
        ExamNumberofAttempts: "" // Clear the error for this field
      })
    }
  }

  /**
   * @ Function Name      : getAllLocation getCourseCycleList
   * @ Function Purpose   : getting locations details
   */
  const getAllLocation = async () => {
    setIsLoading(true)
    const bodyData = {
      limit: 100000000000000000,
      page: DEFAULT_PAGE
    }
    await getCampusList(bodyData)
      .then((result) => {
        if (result?.success) {
          setLocationData(result?.data)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
        setIsLoading(false)
      })
  }

  /**
   * @ Function Name      : getAllExaminationCycle
   * @ Function Purpose   : getting examination cycle details
   */
  const getAllExaminationCourse = async () => {
    setIsLoading(true)
    const bodyData = {
      limit: 10000000,
      page: DEFAULT_PAGE
      // searchedKey: ["CourseTypeSlug"],
      // search: examCourse,
    }
    // await getCourseOfferingList(bodyData)
    await getCourseLmsList(bodyData)
      .then((result) => {
        if (result?.success) {
          setExaminationCourse(result?.data?.results)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
        setIsLoading(false)
      })
  }

  const addRow = () => {
    setRows((prevRows: any) => [
      ...prevRows,
      {
        id: uuidv4(),
        ExamCampusDateTime: "",
        // TimeZoneID: 0,
        CountryID: 0,
        CampusID: 0,
        CountryWiseTimeZoneID: 0,
        timezones: [],
        selectedTime: { hour: "", minute: "", ampm: "" }
      }
    ])
  }

  const handleDynamicTableInputChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setRows(
      rows?.map((row: any, i: number) =>
        i == index ? { ...row, [field]: value } : row
      )
    )
  }

  const handleDateChangeForLocation = (date: any) => {
    const adjustedDate = date
      ? date.hour(12).minute(0).second(0).millisecond(0)
      : null
    setLocationDate(adjustedDate ? adjustedDate.valueOf() : null)
    setGlobalDateTime(adjustedDate ? adjustedDate.valueOf() : null)

    setRows(
      rows.map((row: any, i: number) => {
        const newDateTime = addSelectedTimeToTimestamp(
          `${row.selectedTime.hour}:${row.selectedTime.minute} ${row.selectedTime.ampm}`,
          adjustedDate ? adjustedDate.valueOf() : null
        )
        return { ...row, ExamCampusDateTime: newDateTime }
      })
    )
  }

  const deleteRow = (indexes: any) => {
    if (rows.length == 1 && indexes.length > 0) {
      toast({
        type: "error",
        message: `At least one exam location is required to create this exam.`
      })
      return
    }
    setRows((prevRows: any) =>
      prevRows.filter((row: any, i: number) => !indexes.includes(i))
    )
    setSelectedCheckBoxIndex([])
    setCheckedItems({})
  }

  const generateTimeOptions = () => {
    const timeOptions = []
    for (let hour = 1; hour <= 24; hour++) {
      const hour12 = hour > 12 ? hour - 12 : hour
      const period = hour >= 12 ? "PM" : "AM"
      const formattedTime = hour === 24 ? "12:00 AM" : `${hour12}:00 ${period}`
      timeOptions.push(formattedTime)
    }
    setTimeDropDownData(timeOptions)
  }

  const addSelectedTimeToTimestamp = (
    selectedTime: any,
    baseDate: number | null
  ) => {
    // Parse the selected time
    const [time, period] = selectedTime.split(" ")
    let [hours, minutes] = time.split(":").map(Number)
    let convertedHours = hours
    // Convert to 24-hour format
    if (period === "PM" && convertedHours !== 12) {
      convertedHours += 12
    }
    if (period === "AM" && convertedHours === 12) {
      convertedHours = 0
    }

    // Create a moment object from the existing timestamp in UTC mode
    let date = moment.utc(baseDate || new Date())

    // Set the hours and minutes based on selected time
    date.hour(convertedHours).minute(minutes).second(0).millisecond(0)
    return date.valueOf()
  }

  const handleCheckBoxChange = (index: any) => {
    // Check if the checkbox value is already in the array
    const isIndex = selectedCheckBoxIndex?.indexOf(index)
    setCheckedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index as keyof typeof prevState]
    }))

    if (isIndex == -1) {
      // If not, add it to the array
      setSelectedCheckBoxIndex([...selectedCheckBoxIndex, index])
    } else {
      // If yes, remove it from the array
      const updatedCheckboxes = [...selectedCheckBoxIndex]
      updatedCheckboxes.splice(isIndex, 1)
      setSelectedCheckBoxIndex(updatedCheckboxes)
    }
  }

  // Handle change for exam type
  const handleChangeDropDown = (event: any) => {
    setExamType(event)
    setMockOnlineAutoPublish(false)
    if (event?.ExamTypeSlug === mockExamSlug) {
      setIsTimeLimit(true)
      setIsUnlimited(false)
      formik.setFieldValue("ExamSetTimeLimit", 1)
      formik.setFieldValue("ExamNumberofBookletsID", "")
      formik.setFieldValue("ExamQuizStart", 2)
      formik.setFieldValue("ExamTimeLimitExpires", 1)
      formik.setFieldValue("ExamBreakDuration", 1)
      setNumberOfPaging(1)
      formik.setFieldValue("ExamPaging", 1)
      setNumberOfAttempt(1)
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamNumberofAttempts", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 4)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamBookletDuration", 1)
      formik.setFieldValue("ExamNumberofQuestions", 1)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setIsEvolution(0)
    }
    if (event?.ExamTypeSlug === selfAssessmentExamSlug) {
      setIsTimeLimit(false)
      setIsUnlimited(false)
      formik.setFieldValue("ExamSetTimeLimit", 0)
      formik.setFieldValue("ExamBookletDuration", 0)
      formik.setFieldValue("ExamNumberofBookletsID", 1)
      formik.setFieldValue("ExamBreakDuration", 0)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamQuizStart", 0)
      formik.setFieldValue("ExamTimeLimitExpires", 0)
      formik.setFieldValue("ExamNumberofAttempts", "")
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 1)
      setNumberOfPaging(1)
      formik.setFieldValue("ExamPaging", 1)
      setNumberOfAttempt(0)
      formik.setFieldValue("ExamNumberofQuestions", 0)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setIsEvolution(0)
    }
    if (event?.ExamTypeSlug == quizzExamSlug) {
      setIsTimeLimit(false)
      setIsUnlimited(false)
      // formik.setFieldValue("ExamSetTimeLimit", 1);
      formik.setFieldValue("ExamNumberofAttempts", "")
      formik.setFieldValue("ExamQuizStart", 1)
      formik.setFieldValue("ExamTimeLimit", 1)
      formik.setFieldValue("ExamNumberofBookletsID", 1)
      formik.setFieldValue("ExamPaging", 1)
      formik.setFieldValue("ExamTimeLimitExpires", 0)
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 1)
      formik.setFieldValue("ExamBookletDuration", 0)
      formik.setFieldValue("ExamNumberofQuestions", 0)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setIsEvolution(0)
    }

    formik.setFieldValue("ExamTypeID", event?.ExamTypeID)
  }

  const handleChangeDropDownLocationTypeData = (event: any, prop: any) => {
    if (event?.target?.value == 1) {
      // setIsTimeLimit(true);
      // setIsUnlimited(false);
      formik.setFieldValue("ExamSetTimeLimit", 1)
      formik.setFieldValue("ExamNumberofAttempts", "")
      formik.setFieldValue("ExamQuizStart", 1)
      // formik.setFieldValue("ExamTimeLimit", 1);
      // formik.setFieldValue("ExamNumberofBookletsID", 1);
      formik.setFieldValue("ExamPaging", 1)
      // formik.setFieldValue("ExamTimeLimitExpires", 0);
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 1)
      // formik.setFieldValue("ExamBookletDuration", 0);
      // formik.setFieldValue("ExamNumberofQuestions", 0);
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setMockOnlineAutoPublish(true)
      setIsEvolution(0)
    } else if (event?.target?.value == 2) {
      setIsTimeLimit(true)
      setIsUnlimited(false)
      formik.setFieldValue("ExamSetTimeLimit", 1)
      formik.setFieldValue("ExamNumberofBookletsID", "")
      formik.setFieldValue("ExamQuizStart", 2)
      formik.setFieldValue("ExamTimeLimitExpires", 1)
      formik.setFieldValue("ExamBreakDuration", 1)
      setNumberOfPaging(1)
      formik.setFieldValue("ExamPaging", 1)
      setNumberOfAttempt(1)
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamNumberofAttempts", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 4)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamBookletDuration", 1)
      formik.setFieldValue("ExamNumberofQuestions", 1)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setMockOnlineAutoPublish(false)
      setIsEvolution(0)
    }
  }

  const handleSaveAsDraft = async () => {
    const errors = await formik.validateForm()
    formik.setTouched(
      Object.keys(formik.values).reduce((acc: any, key: any) => {
        acc[key] = true
        return acc
      }, {})
    )
    if (Object.keys(errors).length > 0) {
      return // Exit if there are validation errors
    }
    const draftValues = { ...formik.values }
    // const isValid = validateFields(draftValues, rows, examType);
    // if (!isValid) return; // If validation fails, stop execution
    try {
      // const result = await createNewExam(draftValues);
      const result = {
        success: true
      }
      if (result?.success) {
        toast({ type: "success", message: "Draft saved successfully." })
        router.push("/Exam-Management")
      } else {
        toast({ type: "error", message: "Failed to save draft" })
      }
    } catch (error) {
      toast({
        type: "error",
        message:
          "Sorry, something went wrong while saving the draft. Please try again."
      })
      console.error("Error saving draft:", error)
    }
  }
  // Handle change country dropdown
  const countryHandleChange = (event: any, index: any) => {
    const selectedCountryID = event.target.value
    handleDynamicTableInputChange(
      index,
      "CountryID",
      selectedCountryID ? selectedCountryID : null
    )
    const selectedCountry = originalCountryData.find(
      (country: any) => country.CountryID === selectedCountryID
    )

    if (selectedCountry) {
      const filteredTimezones = originalCountryData
        .filter((country: any) => country.CountryID === selectedCountryID)
        .map((country: any) => ({
          CountryWiseTimeZoneID: country.CountryWiseTimeZoneID,
          Timezone: country.Timezone,
          GoogleTimezone: country.GoogleTimezone
        }))

      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, timezones: filteredTimezones }
          }
          return row
        })
      )

      const alreadySelectedCampuses = rows
        .filter((_: any, rowIndex: any) => rowIndex !== index) // Exclude the current row
        .map((row: any) => row.CampusID) // Get all selected CampusIDs
        .filter((campusID: any) => campusID !== 0) // Remove any unselected campuses (value 0)

      const filteredLocations = locationData.filter(
        (location: any) =>
          location.CountryID === selectedCountryID &&
          !alreadySelectedCampuses.includes(location.CampusID) // Filter out already selected campuses
      )

      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, locations: filteredLocations }
          }
          return row
        })
      )
    } else {
      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, locations: locationData }
          }
          return row
        })
      )
    }
  }

  //Handle Timezone dropdown
  const timezoneHandleChange = async (event: any, index: any) => {
    const selectedOption = event.target.value // Access the selected option object

    handleDynamicTableInputChange(
      index,
      "CountryWiseTimeZoneID",
      selectedOption ? selectedOption : null
    )
  }

  // Handle change country dropdown
  const campusHandleChange = (event: any, index: any) => {
    const selectedCampusID = event?.target.value ? event?.target.value : null
    handleDynamicTableInputChange(index, "CampusID", selectedCampusID)
    setSelectedCampuses((prevSelected) => {
      const updatedSelected = [...prevSelected]
      updatedSelected[index] = selectedCampusID
      return updatedSelected
    })

    setRows((prevRows: any) =>
      prevRows.map((row: any, rowIndex: any) => {
        const alreadySelectedCampuses = prevRows
          .filter((_: any, i: any) => i !== rowIndex)
          .map((r: any) => r.CampusID)
          .filter((id: number) => id !== 0)

        const filteredLocations = locationData.filter(
          (location: any) =>
            location.CountryID === row.CountryID &&
            !alreadySelectedCampuses.includes(location.CampusID)
        )

        return {
          ...row,
          locations: filteredLocations
        }
      })
    )
  }

  const handleChangeExamCourseDropDown = (value: any) => {
    let createCourseArray = value ? [value] : []
    if (!createCourseArray || createCourseArray.length == 0) {
      setSelectedExamCourse([]) // Deselecting all students, so empty the array
      // setOpenAutocomplete(false);
    } else {
      const selectedCourseIds: any = createCourseArray?.map(
        (course: any) => course
      )
      setSelectedExamCourse(selectedCourseIds?.[0])
      console.log("selectedCourseIds?.lmscourseid: ", [
        selectedCourseIds?.[0]?.lmscourseid
      ])
      formik.setFieldValue("PrepXExamAFKACJOSCECourse", [
        selectedCourseIds?.[0]?.lmscourseid
      ])

      // setOpenAutocomplete(false);
    }
  }

  // Handle change for long description check box
  const handleChangeCheckBox = (event: any) => {
    setCheckBoxChecked(event.target.checked)
    if (!event.target.checked) {
      formik.setFieldValue("LongDescription", "")
    }
  }

  // Handle change
  const handleAvailabilityDateChange = (newValue: Dayjs | null) => {
    setAvailabilityDateValue(newValue)
    setDateValue2(newValue)
    formik.setFieldValue("ExamAvailabilityDate", newValue?.valueOf())
  }
  // Handle change
  const handleDueDateChange = (newValue: Dayjs | null) => {
    setDueDateValue(newValue)
    setDateValue2Due(newValue)
    formik.setFieldValue("ExamDueDate", newValue?.valueOf())
    // if (newValue) {
    //   const endOfDay = newValue.endOf("day"); // Sets the time to 11:59:59 pm
    //   setDueDateValue(endOfDay);
    //   formik.setFieldValue("ExamDueDate", endOfDay.valueOf());
    // }
  }

  const quizStart = (value: any) => {
    if (examType?.ExamTypeSlug === quizzExamSlug && value == 2) {
      formik.setFieldValue("ExamTimeLimitExpires", 1)
    }
    formik.setFieldValue("ExamQuizStart", value)
  }

  const examTimeExpire = (value: any) => {
    formik.setFieldValue("ExamTimeLimitExpires", value)
  }

  const handleSetTimeLimit = (event: any) => {
    setIsTimeLimit(event.target.checked)
    formik.setFieldValue("ExamSetTimeLimit", event.target.checked ? 1 : 0)
    formik.setFieldValue("ExamQuizStart", event.target.checked ? 1 : 0)
    formik.setFieldValue("ExamTimeLimitExpires", event.target.checked ? 1 : 0)
    formik.setFieldValue("ExamTimeLimit", 1)
    if (!event.target.checked) {
      formik.setFieldValue("ExamBookletDuration", 0)
      formik.setFieldValue("ExamBreakDuration", 0)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamQuizStart", 0)
      formik.setFieldValue("ExamTimeLimitExpires", 0)
    }
  }

  const calculateTimeLimit = () => {
    const totalDuration =
      formik.values.ExamBookletDuration *
      parseInt(formik.values.ExamNumberofBookletsID)
    const finalValue = totalDuration + Number(formik.values.ExamBreakDuration)
    formik.setFieldValue("ExamTimeLimit", finalValue)
  }

  // Handle change
  const handleGradeDropDown = (event: any, prop: any) => {
    setSelectedGrade(event.target.value)
    formik.setFieldValue("ExamOverallGradeCalculationID", event.target.value)
  }

  // Handle change
  const handleAdditionally = (event: any, prop: any) => {
    formik.setFieldValue("ExamAdditionallyID", event.target.value)
  }

  const handleExamFeedBack = (event: any) => {
    formik.setFieldValue("ExamEvaluationFeedback", event.target.checked ? 1 : 0)
  }

  useEffect(() => {
    if (
      // added or condition so when any of the value changes it will recalculate
      examType &&
      examType?.ExamTypeSlug == mockExamSlug &&
      formik.values.ExamBookletDuration &&
      formik.values.ExamNumberofBookletsID &&
      formik.values.ExamBreakDuration != null
    ) {
      calculateTimeLimit()
    }
  }, [
    formik.values.ExamBookletDuration,
    formik.values.ExamNumberofBookletsID,
    formik.values.ExamBreakDuration
  ])

  useEffect(() => {
    getAllExamTypeList()
    generateTimeOptions()
    getAllLocation()
  }, [])

  useEffect(() => {
    getAllExaminationCourse()
  }, [examCourse])

  useEffect(() => {
    const filteredTimezones = originalCountryData
      .filter((country: any) => country.CountryID === selectedCountry1)
      .map((country: any) => ({
        CountryWiseTimeZoneID: country.CountryWiseTimeZoneID,
        Timezone: country.Timezone,
        GoogleTimezone: country.GoogleTimezone
      }))
    setFilteredTimeZone(filteredTimezones)
  }, [selectedCountry1])

  useEffect(() => {
    if (formik.values.ExamNumberofBookletsID == 1) {
      formik.setFieldValue("ExamBreakDuration", 0)
    }
  }, [formik.values.ExamNumberofBookletsID])

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageContainer
      title="Situational Judgement Exam Create New Session"
      description="iMock Exam"
    >
      {/* breadcrumb */}
      <form onSubmit={formik.handleSubmit}>
        <ExamWizardSteps step={0} />

        <Stack alignItems={"center"} direction={"row"}>
          <Stack flex={1}>
            {" "}
            <Breadcrumb title="Create New Session" items={undefined} />
          </Stack>
        </Stack>
        <FormFirstSection
          formik={formik}
          examTypeData={examTypeData}
          examType={examType}
          handleChangeDropDown={handleChangeDropDown}
          handleChangeExamCourseDropDown={handleChangeExamCourseDropDown}
          examinationCourse={examinationCourse}
          selectedExamCourse={selectedExamCourse}
          isTimeLimit={isTimeLimit}
          checkBoxChecked={checkBoxChecked}
          handleChangeCheckBox={handleChangeCheckBox}
          MockexamLocationTypeData={MockexamLocationTypeData}
          handleChangeDropDownLocationTypeData={
            handleChangeDropDownLocationTypeData
          }
        />

        <Card sx={commonContentCardStyle}>
          {/* Availability Dates and Conditions */}
          {examType?.ExamTypeSlug == mockExamSlug && (
            <AvailabilityDates
              formik={formik}
              fieldLabel={fieldLabel}
              isTimeLimit={isTimeLimit}
              bookletValue={bookletValue}
              numberOfQuestionError={numberOfQuestionError}
              setNumberOfQuestionError={setNumberOfQuestionError}
            />
          )}
          {/* End Availability Dates and Conditions */}
          <ExamTime
            addRow={addRow}
            deleteRow={deleteRow}
            selectedCheckBoxIndex={selectedCheckBoxIndex}
            campusHandleChange={campusHandleChange}
            rows={rows}
            timezoneHandleChange={timezoneHandleChange}
            countryData={countryData}
            countryHandleChange={countryHandleChange}
            ampm={ampm}
            handleTimeChange={handleTimeChange}
            minutes={minutes}
            hours={hours}
            handleClose={handleClose}
            anchorEl={anchorEl}
            openPopoverId={openPopoverId}
            handleClick={handleClick}
            textFieldRef={textFieldRef}
            handleDateChangeForLocation={handleDateChangeForLocation}
            locationDate={locationDate}
            handleCheckBoxChange={handleCheckBoxChange}
            checkedItems={checkedItems}
            handleAvailabilityDateChange={handleAvailabilityDateChange}
            availabilityDateValue={availabilityDateValue}
            formik={formik}
            handleHourChange={handleHourChange}
            selectedHour={selectedHour}
            handleShiftChange={handleShiftChange}
            selectedShift={selectedShift}
            handleMinuteChange={handleMinuteChange}
            selectedMinute={selectedMinute}
            populateOptions={populateOptions}
            examType={examType}
            start={start}
            startDue={startDue}
            handleDueDateChange={handleDueDateChange}
            dueDateValue={dueDateValue}
            handleHourChangeDue={handleHourChangeDue}
            selectedHourDue={selectedHourDue}
            handleMinuteChangeDue={handleMinuteChangeDue}
            selectedMinuteDue={selectedMinuteDue}
            handleShiftChangeDue={handleShiftChangeDue}
            selectedShiftDue={selectedShiftDue}
            handleExamFeedBack={handleExamFeedBack}
            mockOnlineAutoPublish={mockOnlineAutoPublish}
            selectedGrade={selectedGrade}
            handleGradeDropDown={handleGradeDropDown}
            isShuffleQuiz={isShuffleQuiz}
            handleSetUnlimited={handleSetUnlimited}
            isUnlimited={isUnlimited}
            isTimeLimit={isTimeLimit}
            examTimeExpire={examTimeExpire}
            quizStart={quizStart}
            handleSetTimeLimit={handleSetTimeLimit}
          />
        </Card>
        <Box mt={6}>
          <Box display={"flex"} gap={"12px"} justifyContent={"left"}>
            <Button
              sx={{
                ...secondaryButon,
                mr: "auto"
              }}
              onClick={() => {
                handleSaveAsDraft()
              }}
            >
              Save as Draft
            </Button>

            <Button
              sx={{
                ...primaryButon
              }}
              type="submit"
            >
              Next
            </Button>
          </Box>
        </Box>
      </form>
      <CommonPopup
        open={openModal}
        onClose={handleModalClose}
        url={"/acj-exam"}
      />
    </PageContainer>
  )
}
