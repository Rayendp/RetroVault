
import { useEffect, useState } from "react";
import {
  Gamepad2,
  PlayCircle,
  Trophy,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import { getGames } from "../services/gameService";
import { Link } from "react-router-dom";

function Dashboard() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const stats = [
    {
      title: "Total Games",
      value: games.length,
      icon: Gamepad2,
      className: "total",
    },
    {
      title: "Currently Playing",
      value: games.filter((game) => game.status === "Playing").length,
      icon: PlayCircle,
      className: "playing",
    },
    {
      title: "Completed",
      value: games.filter((game) => game.status === "Completed").length,
      icon: Trophy,
      className: "completed",
    },
    {
      title: "Backlog",
      value: games.filter((game) => game.status === "Backlog").length,
      icon: Bookmark,
      className: "backlog",
    },
  ];

  const recentGames = [...games].slice(-4).reverse();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back to your gaming collection.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className={`stat-card ${stat.className}`} key={stat.title}>
              <div className="stat-info">
                <p>{stat.title}</p>
                <h2>{loading ? "..." : stat.value}</h2>
              </div>

              <div className="stat-icon">
                <Icon size={26} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Recently Added Games</h2>
            <p>Your latest additions to RetroVault.</p>
          </div>

          <Link to="/library" className="view-all-btn">
            View Library <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <p>Loading games...</p>
        ) : recentGames.length === 0 ? (
          <p className="empty-message">
            Your library is empty. Add your first game!
          </p>
        ) : (
          <div className="recent-games-grid">
            {recentGames.map((game) => (
              <div className="recent-game-card" key={game._id}>
                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.title}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : null}

                <div className="recent-game-info">
                  <h3>{game.title}</h3>
                  <p>{game.platform} · {game.year}</p>
                  <span className={`status ${game.status.toLowerCase()}`}>
                    {game.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
