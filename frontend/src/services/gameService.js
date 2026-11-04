const API_URL = "http://localhost:5000/api/games";

// Get all games
export const getGames = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch games");
    }

    return response.json();
};

// Add a game
export const addGame = async (gameData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
    });

    if (!response.ok) {
        throw new Error("Failed to add game");
    }

    return response.json();
};

// Update a game
export const updateGame = async (id, gameData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
    });

    if (!response.ok) {
        throw new Error("Failed to update game");
    }

    return response.json();
};

// Delete a game
export const deleteGame = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete game");
    }

    return response.json();
};


// Toggle favorite status
export const toggleFavorite = async (id) => {
    const response = await fetch(`${API_URL}/${id}/favorite`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Failed to update favorite status");
    }

    return response.json();
};
