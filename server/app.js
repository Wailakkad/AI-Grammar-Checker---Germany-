const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const routerAI = require("./Routes/AIRouter.js");
const connect = require("./db/connection.js");

const app = express();
const PORT = 2000;

// CORS configuration to allow credentials (cookies) and a specific origin
const corsOptions = {
  origin: 'http://localhost:3000',   // Allow requests from your frontend (localhost:3000)

  credentials: true,                 // Allow cookies (credentials)
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));  // Use CORS with the specified options

app.use("/api/app", routerAI);

// Connect to the database
connect();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
