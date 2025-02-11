import { connect } from "@/Db/db";
import { Task } from "@/model/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { id } = params;

  try {
    await connect();
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching task", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { id } = params;
  const { title, description, dueDate, completed } = await req.json();
  await connect();
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, dueDate, completed },
    { new: true }
  );
  return NextResponse.json(
    { message: "Task Updated", updatedTask },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { id } = params;
  await connect();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}
