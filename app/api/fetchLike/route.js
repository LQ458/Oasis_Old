import Like from "@/models/like";
import Post from "@/models/post";
import Likestatus from "@/models/likestatus";
import DBconnect from "@/app/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await DBconnect();
  const likes = await Post.find({ forum: "general" });
  return NextResponse.json({ likes }, { status: 200 });
}

export async function POST(req, res) {
  await DBconnect();
  const { postId, sendUsername, status } = await req.json();
  if(status){
    await Like.findOneAndUpdate(
        { postId: postId },
        { $inc: { number: 1 } },
        { new: true },
      );
  }
  else{
    await Like.findOneAndUpdate(
        { postId: postId },
        { $inc: { number: -1 } },
        { new: true },
      );
  }
  await Likestatus.findOneAndUpdate(
    { postId: postId, username: sendUsername },
    { $set: { status: status } },
    { upsert: true, new: true },
  );
  return NextResponse.json(
    { message: "like successfully recorded" },
    { status: 201 },
  );
}
