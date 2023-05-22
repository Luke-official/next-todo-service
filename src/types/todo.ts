import { Document } from "mongoose";

export interface ITodo extends Document {
  id: string;
  name: string;
  description: string;
  status: boolean;
}
