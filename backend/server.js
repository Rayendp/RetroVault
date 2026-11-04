require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const gameRoutes = require("./routes/gameRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to RetroVault API!");
});

// Games API routes
app.use("/api/games", gameRoutes);

// Start server after database connection
const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`RetroVault API running on port ${PORT}`);
    });
};

startServer();