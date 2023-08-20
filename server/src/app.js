const express = require("express");
const env = require("dotenv");
const cors = require("cors");

env.config({ path: __dirname + "/env/.env" });

const indexRout = require("./routes/index2");
const usersRout = require("./routes/UsersRout");
const registerRout = require("./routes/RegisterRout");
const contentsRout = require("./routes/ContentsRout");
const adminRout = require("./routes/AdminRout");
const mailRout = require("./routes/MailRout");
const currencyRout = require("./routes/CurrencyList");

const app = express();

let corsOptions = {
  origin: "*",
  credential: true,
};

app.use(cors(corsOptions));
app.use(express.static("build"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/.next/static/chunks/pages/*");
});

app.use("/", indexRout);
app.use("/api/register", registerRout);
app.use("/api/LoginForm", usersRout);
app.use("/api/contents", contentsRout);
app.use("/api/admin", adminRout);
app.use("/api/mail", mailRout);
app.use("/api/currency", currencyRout);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Loading on port ${port}`));

module.exports = app;
