import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/User.js";
import itemRoute from "./routes/Item.js";
import uploadRoute from "./routes/Upload.js";
import adRoute from "./routes/Ad.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database reached successfuly"))
  .catch((err) => console.log("Error. Can't reach database", err));

///////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Server is up.");
});

app.use("/auth", userRoute);
app.use("/items", itemRoute);
app.use("/upload", uploadRoute);
app.use("/ads", adRoute);

///////////////////////////

const options = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

////////////////////////////////////////////

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log("Error. Can't start server", err);
  }
  console.log("Server started successfuly");
});
