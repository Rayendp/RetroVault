
const express = require("express");
const router = express.Router();

const {
  getGames,
  getGame,
  addGame,
  updateGame,
  toggleFavorite,
  deleteGame,
} = require("../controllers/gameController");

// GET all games
router.get("/", getGames);

// GET one game
router.get("/:id", getGame);

// ADD a game
router.post("/", addGame);

// TOGGLE favorite status
router.patch("/:id/favorite", toggleFavorite);

// UPDATE a game
router.put("/:id", updateGame);

// DELETE a game
router.delete("/:id", deleteGame);

module.exports = router;
