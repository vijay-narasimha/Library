const express = require("express");
const bookRouter = require("./router/bookRouter");
const viewRouter = require("./router/viewRouter");
const userRouter = require("./router/userRouter");
const path = require("path");
const cookieparser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieparser());
app.use("/", viewRouter);
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

module.exports = app;
