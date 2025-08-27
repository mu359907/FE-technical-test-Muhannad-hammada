"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Admin Dashboard as the default page
    router.replace("/Exam-Management");
  }, [router]);

  return (
    <div>
      <p>Redirecting to Admin Dashboard...</p>
    </div>
  );
}
