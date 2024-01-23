import DBconnect from "@/app/libs/mongodb";
import Post from "@/models/post";
import Like from "@/models/like";
import Likestatus from "@/models/likestatus";
import { NextResponse } from "next/server";

export async function GET() {
  await DBconnect();
  const posts = (await Post.find({ group: "general" })).reverse();
  const postslikes = await Like.find({ group: "general" });
  return NextResponse.json({ posts }, { postslikes });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await DBconnect();
  Promise.all([
    Post.findByIdAndDelete(id),
    Like.findOneAndDelete({ postId: id }),
    Likestatus.deleteMany({ postId: id }),
  ]);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
