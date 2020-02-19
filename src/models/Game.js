import mongoose from "mongoose";
import Item from "./Item";

Item.discriminator(
  "Game",
  new mongoose.Schema({
    developer: { type: String, required: true, text: true }
  })
);

module.exports = mongoose.model("Game");
