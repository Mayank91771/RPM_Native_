const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const { urlNotFound, errorHandler } = require("./middlewares/errorMiddleware");

require("dotenv").config();
require("./db/db");

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/api/user", (req, res) => {
//   res.send("<h1>Success</h1>");
// });

app.use("/api/users", userRoutes);

app.use(urlNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app running at ${PORT}`);
});
