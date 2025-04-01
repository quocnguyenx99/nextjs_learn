import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import envConfig from "@/config";
import { cookies } from "next/headers";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value ?? "";

  if (!sessionToken) {
    console.error("Không tìm thấy sessionToken");
    return <div>Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.</div>;
  }

  const response = await accountApiRequest.me(sessionToken);

  return (
    <>
      <h1>Profile</h1>
      <div>Xin chào, {response.payload.data.name}</div>
      {/* <Profile /> */}
    </>
  );
}
