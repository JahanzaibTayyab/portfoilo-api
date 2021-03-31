const { Skills, validate } = require("../models/skills");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const skills = await Skills.find();
  res.send(skills);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let skill = new Skills({
    user: req.user._id,
    name: data.name,
    level: data.level,
    value: data.value,
  });
  await skill.save();
  res.send(skill);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const skill = await Skills.findByIdAndUpdate(
    req.params.id,
    {
      name: data.name,
      level: data.level,
      value: data.value,
    },
    { new: true }
  );

  if (!skill)
    return res.status(404).send("The skill with the given ID was not found.");

  res.send(skill);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const skill = await Skills.findByIdAndRemove(req.params.id);

  if (!skill)
    return res.status(404).send("The skill with the given ID was not found.");

  res.send(skill);
});

router.get("/:id", async (req, res) => {
  const skill = await Skills.findById(req.params.id);

  if (!skill)
    return res.status(404).send("The skill with the given ID was not found.");

  res.send(skill);
});

module.exports = router;
