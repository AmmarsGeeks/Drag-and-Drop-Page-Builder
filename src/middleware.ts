import { NextResponse } from "next/server";

export function middleware() {
  // No-op
  return NextResponse.next();
}