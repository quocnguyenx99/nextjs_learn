import { decodeJWT } from "@/lib/utils";
import { cookies } from "next/headers";

type PayloadJWT = {
  iat: number;
  exp: number;
  tokenType:string;
  userId: number
}



export async function POST(request: Request) {
  const cookieStore = await cookies();
  try {
    const res = await request.json();

    const sessionToken = res?.sessionToken as string;

    if (!sessionToken) {
      return Response.json({ message: "Token not found" }, { status: 400 });
    }

    const payload = decodeJWT<PayloadJWT>(sessionToken);
    const expiresDate = new Date(payload.exp * 1000).toUTCString();

    cookieStore.set({
      name: "sessionToken",
      value: sessionToken,
      path: "/",
      httpOnly: true,
      expires: new Date(expiresDate),
      sameSite: 'lax',
      secure:true
    });

    return Response.json(
      { message: "Session token set successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: "Invalid request", error: error.message },
      { status: 400 }
    );
  }
}

