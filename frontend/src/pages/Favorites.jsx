
import { useState, useEffect } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getGames,
  toggleFavorite,
} from "../services/gameService";

function Favorites() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load favorite games
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setError("");

        const data = await getGames();

        setGames(data.filter((game) => game.favorite === true));
      } catch (error) {
        console.error("Error loading favorites:", error);
        setError("Could not load your favorite games.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Remove a game from favorites
  const handleRemoveFavorite = async (id) => {
    try {
      setError("");

      await toggleFavorite(id);

      setGames((previousGames) =>
        previousGames.filter((game) => game._id !== id)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
      setError("Could not remove favorite. Please try again.");
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

          <h1>My Favorite Games</h1>
          <p>All the games you love, in one place.</p>
        </div>
      </div>

      {error && <p className="empty-message">{error}</p>}

      {loading ? (
        <p className="empty-message">Loading your favorites...</p>
      ) : (
        <>
          <div className="game-grid">
            {games.map((game) => (
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
                  onClick={() => handleRemoveFavorite(game._id)}
                  title="Remove from favorites"
                  aria-label="Remove from favorites"
                >
                  <Heart
                    size={21}
                    fill="currentColor"
                  />
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
                </div>
              </div>
            ))}
          </div>

          {games.length === 0 && (
            <p className="empty-message">
              You haven't added any favorites yet. Visit your Library and click
              the heart on a game to add it here!
            </p>
          )}
        </>
      )}

    </div>
  );
}

export default Favorites;
