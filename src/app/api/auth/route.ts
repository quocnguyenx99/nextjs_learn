import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies()
  try {
    const res = await request.json();

    console.log('>>>>check res', res.payload);
    
    const sessionToken = res?.sessionToken as string  

    if (!sessionToken) {
      return Response.json({ message: "Token not found" }, { status: 400 });
    }

    cookieStore.set({
      name: "sessionToken",
      value: sessionToken,
      path: "/",
    });

    return Response.json({ message: "Session token set successfully" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Invalid request", error: error.message }, { status: 400 });
  }
}