"use client";

import { useAppContext } from "@/app/AppProvider";
import envConfig from "@/config";
import { useEffect } from "react";

function Profile() {
  const { sessionToken } = useAppContext();

  useEffect(() => {
    const fetchRequet = async () => {
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }

        return data;
      });
      console.log("Response from server:", response);
    };
    fetchRequet();
  }, [sessionToken]);

  return <h1>Profile page</h1>;
}

export default Profile;
