"use client";

import accountApiRequest from "@/apiRequests/account";
import { useEffect } from "react";

function Profile() {
  useEffect(() => {
    const fetchRequet = async () => {
      const result = await accountApiRequest.meClient();
      console.log(result);
    };
    fetchRequet();
  }, []);

  return <h1>Profile page</h1>;
}

export default Profile;
