import Like from "@/models/like";
import DBconnect from "@/libs/mongodb";
import Likestatus from "@/models/likestatus";
import MainTopic from "@/models/mainTopic";
import SubTopic from "@/models/subTopic";
import { NextResponse } from "next/server";

export async function GET(req) {
  await DBconnect();
  const [mainTopics, subTopics] = await Promise.all([
    MainTopic.find({}),
    SubTopic.find({}),
  ]);
  return NextResponse.json(
    { mainTopics, subTopics, message: "Topics find" },
    { status: 200 },
  );
}
