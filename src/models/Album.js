import mongoose from "mongoose";
import Item from "./Item";

Item.discriminator(
  "Album",
  new mongoose.Schema({
    artist: { type: String, required: true, text: true }
  })
);

module.exports = mongoose.model("Album");
