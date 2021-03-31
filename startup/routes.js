const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const formRouter = require("../routes/contactForm");
const aboutRouter = require("../routes/about");
const servicesRouter = require("../routes/services");
const educationsRouter = require("../routes/education");
const experiencesRouter = require("../routes/experience");
const authRouter = require("../routes/auth");
const skillRouter = require("../routes/skills");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  //routes
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/auth", authRouter);
  app.use("/contact", formRouter);
  app.use("/about", aboutRouter);
  app.use("/services", servicesRouter);
  app.use("/education", educationsRouter);
  app.use("/experiences", experiencesRouter);
  app.use("/skills", skillRouter);
  app.use(error);
};
