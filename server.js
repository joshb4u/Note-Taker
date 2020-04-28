//Dependencies
const express = require("express");
const path = require("path")
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes.js");

let app = express();

let PORT = process.env.PORT || 3000;

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting up a path to the folders files to grab
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
