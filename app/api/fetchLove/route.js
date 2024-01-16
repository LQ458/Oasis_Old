import DBconnect from "@/app/libs/mongodb";
import Loveform from "@/models/loveform";
import { NextResponse } from "next/server";

export async function GET() {
    await DBconnect();
    const loveforms = (await Loveform.find({})).reverse();
    return NextResponse.json({loveforms}, {status: 200})
}