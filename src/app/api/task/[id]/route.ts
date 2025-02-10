import { connect } from "@/Db/db";
import { Task } from "@/model/taskModel";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { id: string };
}

export async function PUT(req: NextRequest, context: Context) {
  const { id } = context.params;
  const { title, description, dueDate, completed } = await req.json();

  await connect();
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, dueDate, completed },
    { new: true }
  );

  if (!updatedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Task Updated", updatedTask },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest, context: Context) {
  const { id } = context.params;

  await connect();
  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}

export async function GET(req: NextRequest, context: Context) {
  const { id } = context.params;

  await connect();

  try {
    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching task", error: (error as Error).message },
      { status: 500 }
    );
  }
}
