import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { createHash } from "crypto";
import { JWT, encode } from "next-auth/jwt";
import { Environment } from "@/utils/Constants";
import os from 'os';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}
const baseUrl = process.env.NEXTAUTH_URL!;
export async function POST(request: NextRequest) {

  try {
    // const origin = request.headers.get("origin");

    // if (origin !== process.env.ALLOWED_LMS_ORIGINS!) {
    //   console.error("Unauthorized LMS origin:", origin);
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    const networkInterfaces = os.networkInterfaces();
    let primaryMacAddress = '';
  
    for (const interfaceKey in networkInterfaces) {
      const networkInfo = networkInterfaces[interfaceKey];
      
      // Check if networkInfo is defined and contains valid addresses
      if (networkInfo) {
        for (const address of networkInfo) {
          if (address.mac && address.mac !== '00:00:00:00:00:00') {
            primaryMacAddress = address.mac;
            break;
          }
        }
      }
      if (primaryMacAddress) break;
    }
  
    const LmsUserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log({ baseUrl });
    const formData = await request.formData();
    

    const { lis_person_contact_email_primary, context_id, context_title, lis_person_name_given, lis_person_name_family, lis_person_name_full  } = Object.fromEntries(formData);

    const session = await getServerSession(authOptions);

    if (session) {
      console.log({ session: session, message: "Session is exist" });
      return NextResponse.redirect(new URL(baseUrl), {
        status: 303,
      });
    }

    const email = lis_person_contact_email_primary?.toString();
    if (!email) {
      throw new Error("Email not provided in LTI launch data");
    }

    const user = await loginLmsUser(email, context_id, context_title, lis_person_name_given, lis_person_name_family, lis_person_name_full, primaryMacAddress, LmsUserTimeZone );

    const token: JWT = {
      ...user,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      jti: createHash("md5")
        .update(user.id + Date.now().toString())
        .digest("hex"),
    };

    const encodedToken = await encode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
      maxAge: 24 * 60 * 60,
    };

    const response = NextResponse.redirect(new URL(baseUrl), {
      status: 303,
    });

    const cookiesName = Environment.IsDevelopment()
      ? "next-auth.session-token"
      :  "__Secure-next-auth.session-token";

    response.cookies.set(cookiesName, encodedToken, cookieOptions);

    console.log({ message: "OK response sent" });

    return response;
  } catch (error: any) {
    console.error("Error processing LTI request:", error);
    return NextResponse.redirect(new URL(baseUrl), {
      status: 303,
    });
  }
}

// const getPermission = async (token: string) => {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}user/getRoleBasedPermission`,
//       { headers: { UserAuthToken: token } }
//     );
//     console.log({ response });
//     if (response?.data?.success) {
//       return {
//         RolePermissions: response.data?.Dashboard,
//         DashboardPermission: response.data?.RolePermissions,
//       };
//     }

//     throw new Error("Failed to set permission");
//   } catch (error: any) {
//     console.error("Error while getting permission:", error);
//     throw new Error("Failed to set permission");
//   }
// };

const loginLmsUser = async (email: string, context_id:any, context_title:any, lis_person_name_given: any, lis_person_name_family: any, lis_person_name_full:any, primaryMacAddress:any, LmsUserTimeZone:any ): Promise<User> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}user/loginLmsUser`,
      { email, context_id, context_title, lis_person_name_given, lis_person_name_family, lis_person_name_full,primaryMacAddress, LmsUserTimeZone },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log({ response: response?.data });

    if (response?.data?.success) {
      return {
        id: response.data.data?.Userdetails?.UserID,
        name: response.data.data?.Userdetails,
        email: response.data.data?.Userdetails,
        image: response.data.data?.Userdetails?.UserAuthToken,
      };
    }
    throw new Error("Login failed");
  } catch (error) {
    console.error("Error in loginLmsUser:", error);
    throw new Error("LMS user login failed");
  }
};
