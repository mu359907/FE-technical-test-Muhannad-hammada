import axios from "axios";
import { getSession } from "next-auth/react";
import toast from "../../../src/app/(DashboardLayout)/components/Toast/index";
import { signOut } from "next-auth/react";

const ApiCall = async (url: string, method: string, data?: {}) => {
  let headerData = {};

  const session: any = await getSession();

  if (session) {
    // console.log('session?.user?.image: ', JSON.parse(session?.user?.email));
    const token = session?.user?.image ? session?.user?.image : session?.user?.email?.UserAuthToken; // const token = session?.user?.email
    headerData = {
      UserAuthToken: token, // UserAuthToken: `${token?.Userdetails?.UserAuthToken}`,
    };
  }

  try {
    const result = await axios({
      url,
      method,
      headers: headerData,
      data,
    });

    const response = result.data; // No need to await again

    return response;
  } catch (error: any) {
    if (error?.response?.status == 403) {
      //  window.location.href = "/auth/error";
    }
    if (error?.response?.status == 401) {
      toast({ type: "error", message: error?.response?.data?.message });
      // You might want to return here to prevent further execution

      if (error?.response?.data?.error == "TokenExpiredError") {
        //window.location.href = "/login";
        signOut({
          redirect: true,
          callbackUrl: "/login",
        });
      }
      return;
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

export default ApiCall;
