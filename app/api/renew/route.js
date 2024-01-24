import DBconnect from "@/app/libs/mongodb";
import Like from "@/models/like";
import { NextResponse } from "next/server";

export async function GET(req) {
  await DBconnect();
  const postId = req.nextUrl.searchParams.get("postId");
  const like = await Like.findOne({ postId: postId });
  return NextResponse.json({ like }, { status: 200 });
}
