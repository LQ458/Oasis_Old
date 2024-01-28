import { DBconnect, DBclose } from "@/libs/mongodb";
import { NextResponse } from "next/server.js";
import User from "@/models/user";
import Post from "@/models/post";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, content } = await request.json();
  await DBconnect();
  await Post.findByIdAndUpdate(id, { title, content });
  return NextResponse.json({ message: "Post Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await DBconnect();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}
