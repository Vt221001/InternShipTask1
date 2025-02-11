import { connect } from "@/Db/db";
import { Task } from "@/model/taskModel";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
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

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = params;
  const { title, description, dueDate, completed } = await req.json();

  try {
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
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating task", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    await connect();
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting task", error },
      { status: 500 }
    );
  }
}
