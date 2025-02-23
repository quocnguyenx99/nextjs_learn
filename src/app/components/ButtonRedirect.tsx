"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ButtonRedirect() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/login");
  };

  return <Button onClick={handleNavigate}>Chuyen trang</Button>;
}

export default ButtonRedirect;
