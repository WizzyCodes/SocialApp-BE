import { model, Schema, Types, Document } from "mongoose";

interface iProps {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  friends: Array<{}>;
  following: Array<string>;
  follower: Array<string>;
  posts: Array<{}>;
}

interface iPropsData extends iProps, Document {}

const userModel = new Schema<iPropsData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    friends: [
      {
        type: {},
      },
    ],
    following: [
      {
        type: String,
      },
    ],
    follower: [
      {
        type: String,
      },
    ],

    posts: [
      {
        type: Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);
export default model<iPropsData>("users", userModel);
