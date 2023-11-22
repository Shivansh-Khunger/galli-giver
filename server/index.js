const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const galliArray = [
  " ki maa ki chut",
  " ki maa ka bhosda",
  " ki maa ki chut me danda",
  " ki attendace chud jaye",
];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the backend server of galli giver");
});

app.get("/galli", (req, res) => {
  let jsonString = `{"modifiedName":"${
    req.query.name + galliArray[Math.floor(Math.random() * galliArray.length)]
  }"}`;
  let json = JSON.parse(jsonString);
  console.log(json);
  res.json(json);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}, Listening on http://localhost:${PORT}`
  );
});
