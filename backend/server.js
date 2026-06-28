require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({
    origin: [
        "https://task-tracker-dun-six.vercel.app",
        "http://localhost:5173"
    ],
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API running");
});

app.use("/api/tasks", require("./routes/taskRoutes"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});
