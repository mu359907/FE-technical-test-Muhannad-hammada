import Redis from "ioredis";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const REDIS_URL =
  process.env.REDIS_URL ||
  "redis://:iNhfPcdmX9xWb5mGSW2mYDbQGE4u2g3REAzCaH5x1GI=@prepx.redis.cache.windows.net:6380";

const redis = new Redis(REDIS_URL, {
  tls: {
    rejectUnauthorized: false, // Required for Azure Redis with TLS
  },
});

redis.on("connect", () => {
  //console.log('Connected to Redis trainee exam');
});

redis.on("error", (err) => {
  console.error("Redis connection error trainee exam:", err);
});

export async function POST(req: NextRequest) {
  const { key } = await req.json();
  const session = await getServerSession(authOptions);
  const keys = await redis.keys("*"); // Gets all keys
  // console.log('Stored keys',keys); // Array of key names

  if (!key) {
    return new NextResponse(JSON.stringify({ error: "Key is required" }), {
      status: 200,
    });
  }

  try {
    const value = await redis.get(key);
    if (value) {
      return new NextResponse(
        JSON.stringify({ success: true, data: JSON.parse(value) }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Key not found in Redis" }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Redis operation error:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// export async function DELETE(req: NextRequest) {
//   const { key } = await req.json();
//   const session = await getServerSession(authOptions);
//   const keys = await redis.keys("*"); // Gets all keys
//   // console.log('Stored keys',keys); // Array of key names

//   if (!key) {
//     return new NextResponse(JSON.stringify({ error: "Key is required" }), {
//       status: 200,
//     });
//   }

//   try {
//     const value = await redis.del(key);
//     if (value) {
//       return new NextResponse(JSON.stringify({ success: true }), {
//         status: 200,
//       });
//     } else {
//       return new NextResponse(
//         JSON.stringify({ success: false, message: "Key not found in Redis" }),
//         { status: 200 }
//       );
//     }
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({ error: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req: NextRequest) {
  const { key } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  if (!key) {
    return new NextResponse(JSON.stringify({ error: "Key is required" }), {
      status: 400,
    });
  }

  try {
    const value = await redis.del(key);
    if (value) {
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Key not found in Redis" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting key from Redis:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
