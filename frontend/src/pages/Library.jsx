
import { useState, useEffect } from "react";
import { Search, Plus, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getGames,
  addGame,
  updateGame,
  deleteGame,
  toggleFavorite,
} from "../services/gameService";

function Library() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newGame, setNewGame] = useState({
    title: "",
    genre: "",
    platform: "",
    status: "Backlog",
    year: "",
    image: "",
  });

  // Load games from MongoDB
  useEffect(() => {
    const loadGames = async () => {
      try {
        setError("");
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error("Error loading games:", error);
        setError("Could not load games. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Search games
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  // Reset form
  const resetForm = () => {
    setNewGame({
      title: "",
      genre: "",
      platform: "",
      status: "Backlog",
      year: "",
      image: "",
    });

    setEditingGame(null);
    setShowForm(false);
  };

  // Add or update a game
  const handleAddGame = async (e) => {
    e.preventDefault();

    const gameData = {
      ...newGame,
      year: Number(newGame.year),
    };

    try {
      setError("");

      if (editingGame) {
        const updatedGame = await updateGame(
          editingGame._id,
          gameData
        );

        setGames((previousGames) =>
          previousGames.map((game) =>
            game._id === editingGame._id ? updatedGame : game
          )
        );
      } else {
        const savedGame = await addGame(gameData);

        setGames((previousGames) => [
          ...previousGames,
          savedGame,
        ]);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving game:", error);
      setError("Could not save the game. Please try again.");
    }
  };

  // Edit a game
  const handleEditGame = (game) => {
    setEditingGame(game);

    setNewGame({
      title: game.title,
      genre: game.genre,
      platform: game.platform,
      status: game.status,
      year: String(game.year),
      image: game.image || "",
    });

    setShowForm(true);
  };

  // Toggle favorite
  const handleToggleFavorite = async (id) => {
    try {
      setError("");

      const updatedGame = await toggleFavorite(id);

      setGames((previousGames) =>
        previousGames.map((game) =>
          game._id === id ? updatedGame : game
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
      setError("Could not update favorite. Please try again.");
    }
  };

  // Delete a game
  const handleDeleteGame = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteGame(id);

      setGames((previousGames) =>
        previousGames.filter((game) => game._id !== id)
      );
    } catch (error) {
      console.error("Error deleting game:", error);
      setError("Could not delete the game. Please try again.");
    }
  };

  return (
    <div className="library-page">

      <div className="library-header">
      <div>
        <Link to="/" className="back-dashboard-btn">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1>My Game Library</h1>
        <p>Manage and explore your collection.</p>
      </div>

        <button
          className="add-game-btn"
          onClick={() => {
            setEditingGame(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} />
          Add Game
        </button>
      </div>

      {error && <p className="empty-message">{error}</p>}

      {showForm && (
        <form className="game-form" onSubmit={handleAddGame}>
          <h2>{editingGame ? "Edit Game" : "Add a New Game"}</h2>

          <input
            type="text"
            placeholder="Game title"
            value={newGame.title}
            onChange={(e) =>
              setNewGame({ ...newGame, title: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Genre"
            value={newGame.genre}
            onChange={(e) =>
              setNewGame({ ...newGame, genre: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Platform (PC, PlayStation, Xbox...)"
            value={newGame.platform}
            onChange={(e) =>
              setNewGame({ ...newGame, platform: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Release year"
            min="1950"
            max="2100"
            value={newGame.year}
            onChange={(e) =>
              setNewGame({ ...newGame, year: e.target.value })
            }
            required
          />

          <select
            value={newGame.status}
            onChange={(e) =>
              setNewGame({ ...newGame, status: e.target.value })
            }
          >
            <option value="Backlog">Backlog</option>
            <option value="Playing">Playing</option>
            <option value="Completed">Completed</option>
          </select>

          <input
            type="url"
            placeholder="Cover image URL"
            value={newGame.image}
            onChange={(e) =>
              setNewGame({ ...newGame, image: e.target.value })
            }
          />

          <div className="form-buttons">
            <button type="submit">
              {editingGame ? "Save Changes" : "Add Game"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="library-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search your games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="empty-message">Loading your games...</p>
      ) : (
        <>
          <div className="game-grid">
            {filteredGames.map((game) => (
              <div className="game-card" key={game._id}>

                <div className="game-image">
                  {game.image && (
                    <img
                      src={game.image}
                      alt={game.title}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                </div>

                <button
                  className="favorite-btn"
                  onClick={() => handleToggleFavorite(game._id)}
                  title={
                    game.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  aria-label={
                    game.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    size={21}
                    fill={game.favorite ? "currentColor" : "none"}
                  />
                </button>

                <button
                  className="edit-btn"
                  onClick={() => handleEditGame(game)}
                >
                  Edit Game
                </button>

                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p>{game.genre}</p>

                  <div className="game-details">
                    <span>{game.platform}</span>
                    <span>{game.year}</span>
                  </div>

                  <span className={`status ${game.status.toLowerCase()}`}>
                    {game.status}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteGame(game._id)}
                  >
                    Delete Game
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <p className="empty-message">
              {search
                ? "No games found."
                : "Your library is empty. Add your first game!"}
            </p>
          )}
        </>
      )}

    </div>
  );
}

export default Library;
