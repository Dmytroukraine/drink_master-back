const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { DB_HOST, PORT } = process.env;

mongoose
  .set("strictQuery", false)
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful..");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
