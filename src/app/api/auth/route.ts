import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies()
  try {
    const res = await request.json();
    const sessionToken = res?.payload?.data?.token;

    if (!sessionToken) {
      return Response.json({ message: "Token not found" }, { status: 400 });
    }

    cookieStore.set({
      name: "sessionToken",
      value: sessionToken,
      path: "/",
    });

    return Response.json(
      res?.payload,
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ message: "Invalid request", error: error.message }, { status: 400 });
  }
  }