import DBconnect from "@/app/libs/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { username } = await req.json();
    console.log(username);
    await DBconnect();
    const posts = await Post.find({ username: username });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
