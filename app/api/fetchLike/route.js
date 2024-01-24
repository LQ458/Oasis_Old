import Like from "@/models/like";
import Post from "@/models/post";
import Likestatus from "@/models/likestatus";
import DBconnect from "@/app/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const username = req.nextUrl.searchParams.get("username");
    const [likes, likestatuses] = await Promise.all([
      Like.find({ forum: "general" }),
      Likestatus.find({ username: username }),
    ]);
    console.log(username);
    return NextResponse.json({ likes, likestatuses }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await DBconnect();
  const { postId, sendUsername, status } = await req.json();
  await Promise.all([
    status
      ? Like.findOneAndUpdate(
          { postId: postId },
          { $inc: { number: 1 } },
          { new: true },
        )
      : Like.findOneAndUpdate(
          { postId: postId },
          { $inc: { number: -1 } },
          { new: true },
        ),
    Likestatus.findOneAndUpdate(
      { postId: postId, username: sendUsername },
      { $set: { status: status } },
      { upsert: true, new: true },
    ),
  ]);
  return NextResponse.json(
    { message: "like successfully recorded" },
    { status: 201 },
  );
}
