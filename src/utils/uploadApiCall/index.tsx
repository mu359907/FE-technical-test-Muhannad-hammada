import axios from "axios";
import { getSession } from "next-auth/react";
import toast from "../../../src/app/(DashboardLayout)/components/Toast/index";

const UploadApiCall = async (url: string, method: string, data?: {}) => {
  let headerData = {};

  const session: any = await getSession();
  if (session) {
    headerData = {
      "Content-Type": "multipart/form-data",
      Userauthtoken: `${session?.user?.image}`,
    };
  }
  try {
    const result = await axios(`${url}`, {
      method,
      headers: headerData,
      data,
    });
    const response = await result.data;
    return response;
  } catch (error: any) {
    if (error?.response?.status == 403) {
      window.location.href = "/auth/error";
    }
    Object.entries(error?.response?.data?.errors).forEach(([key, value]) => {
      // Show toast for each error
      toast({ type: "error", message: `${value}` });
    });
    error.response
      ? console.log("error", error.response.data.message)
      : console.log("error", error.message);
    return null;
  }
};

export default UploadApiCall;
