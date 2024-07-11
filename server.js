const PREFIX = "/api";
const VERSION = "/v1";
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./shared/config/db");
const logger = require("./shared/middlewares/logger");
const errorHandler = require("./shared/middlewares/error");

// Define environment variable
dotenv.config({ path: "./shared/config/config.env" });

connectDB().then();

const app = express();

// Body parser
app.use(express.json({ limit: "5mb" }));

app.use(cors());

// Error Handler
app.use(errorHandler);

app.use(logger); // Personal logger

/**  /api/v1/student **/
const studentRoutes = require("./shared/routes/schoolar.route");

app.use(PREFIX + VERSION + "/schoolar", studentRoutes);

const PORT = process.env.PORT || 7000;

const server = app.listen(
  PORT,
  '0.0.0.0',
  () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
  }
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
