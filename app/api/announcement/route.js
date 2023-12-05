import DBconnect from "@/app/libs/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    await DBconnect();
    const post = new Post({
      title: title,
      content: content,
      group: "announcement",
    });

    return NextResponse.json(
      { message: "Announcement Created" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  await DBconnect();
  const posts = await Post.find({ group: "announcement" });
  return NextResponse.json({ posts });
}
