import { Document, Schema, model, Types } from "mongoose";

interface iComment {
  userID: string;
  title: string;
}

interface iCommentData extends iComment, Document {}

const commentPostModel = new Schema<iCommentData>(
  {
    title: {
      type: String,
    },
    userID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iCommentData>("comment", commentPostModel);
