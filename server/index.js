const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/galli", (req, res) => {
  let jsonString = `{"modifiedName":"${req.query.name} ki maa ki chut"}`;
  let json = JSON.parse(jsonString);
  console.log(json);
  res.json(json);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
