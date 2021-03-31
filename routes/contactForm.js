const { Contact, validate } = require("../models/contactForm");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort("name");
  res.send(contacts);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let contact = new Contact(
    _.pick(req.body, ["name", "email", "subject", "message"])
  );
  await contact.save();
  res.send(contact);
});

module.exports = router;
