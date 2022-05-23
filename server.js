const express = require("express");
const port = 3000;
const server = express();

server.all("/", (req, res) => {
  res.send("SITCOM is running!");
});

function keepAlive() {
  server.listen(port, () => {
    console.log("Server is ready.");
  });
}

module.exports = keepAlive;
