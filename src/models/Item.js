import mongoose from "mongoose";
import "babel-polyfill";

const { Schema } = mongoose;

// Source:
// https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
export function* range(start, end) {
  yield start;
  if (start === end) return;
  yield* range(start + 1, end);
}

export function getCurrentYear(date) {
  return date.getFullYear();
}

// The discriminator key value is what the mongoose
// discriminator() method takes as an argument to
// distinguish between item types (i.e. Movie, Show, Book)
// in the model .js files.
const baseOptions = {
  discriminatorKey: "itemtype",
  collection: "items",
  timestamps: {}
};

mongoose.model(
  "Item",
  new Schema(
    {
      title: { type: String, required: true, text: true },
      published_year: { type: Number, required: true, text: true },
      belongs_to_year: {
        type: String, // this should be a Number ¯⁠\_(ツ)_/⁠¯
        required: true,
        text: true,
        enum: [...range(2007, getCurrentYear(new Date()))]
      },
      redo: { type: Boolean, required: false, default: false },
      updated_date: { type: Date, default: Date.now }
    },
    baseOptions
  )
);

export default mongoose.model("Item");
