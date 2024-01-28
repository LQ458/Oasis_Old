import Comment from "@/models/comment";
import Post from "@/models/post";
import DBconnect from "@/libs/mongodb";

export async function GET(req) {
  await DBconnect();
}
