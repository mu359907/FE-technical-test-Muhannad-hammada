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
  const { key, value } = await req.json();
  const session = await getServerSession(authOptions);

  if (!key || typeof value === "undefined") {
    return new NextResponse(
      JSON.stringify({ error: "Key and value are required" }),
      { status: 200 }
    );
  }

  try {
    // Set value in Redis with 1 hour expiration

    console.log("value///////////////", value);
    await redis.set(key, JSON.stringify(value), "EX", 360000000);

    return new NextResponse(
      JSON.stringify({ success: true, message: "Data stored in Redis" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Redis operation error:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
