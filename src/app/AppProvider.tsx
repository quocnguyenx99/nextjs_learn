"use client";

import { clientSessionToken } from "@/lib/http";
import { createContext, useLayoutEffect, useState } from "react";

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  // useLayoutEffect(() => {
  //   clientSessionToken.value = initialSessionToken;
  // });
  useState(() => {
    clientSessionToken.value = initialSessionToken;
  });
  return <>{children}</>;
}
