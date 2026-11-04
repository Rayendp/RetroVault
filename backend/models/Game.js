
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Backlog", "Playing", "Completed"],
      default: "Backlog",
    },

    image: {
      type: String,
      default: "",
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
