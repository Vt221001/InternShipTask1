import { connect } from "@/Db/db";
import { Task } from "@/model/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connect();
  const tasks = await Task.find();
  return NextResponse.json({ message: "All Task ", tasks }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { title, description, dueDate } = await req.json();
  console;
  await connect();
  const task = await Task.create({
    title,
    description,
    dueDate,
  });

  return NextResponse.json({ "Task Created": task }, { status: 201 });
}

