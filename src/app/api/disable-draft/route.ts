import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const dm = await draftMode();
  dm.disable();
  return NextResponse.redirect(new URL("/", request.url));
}
