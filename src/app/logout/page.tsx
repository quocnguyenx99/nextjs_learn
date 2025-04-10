"use client";

import authApiRequest from "@/apiRequests/auth";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Logout() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === clientSessionToken?.value) {
      authApiRequest.logoutFromNextClientToServer(true, signal).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    }

    return () => {
      controller.abort();
    };
  }, [sessionToken, router]);
  return <div>page</div>;
}

export default Logout;
