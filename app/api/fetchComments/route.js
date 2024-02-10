import Comment from "@/models/comment";
import Post from "@/models/post";
import DBconnect from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const postId = req.nextUrl.searchParams.get("postId");
    const comments = (await Comment.find({ postId: postId })).reverse();
    return NextResponse.json(
      { comments, message: "Successfully fetched comments" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
