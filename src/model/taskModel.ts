import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  dueDate?: Date;
  completed: boolean;
}

const taskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, required: false },
});

export const Task =
  mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);
