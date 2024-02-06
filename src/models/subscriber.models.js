import mongoose, { Schema } from "mongoose";

const subscriberSchema = new Schema(
  {
    subscriber: {
      // one who is subscribing
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      // one whom to subscriber is subscribing
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
