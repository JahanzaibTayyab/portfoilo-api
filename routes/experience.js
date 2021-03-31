const { Experience, validate } = require("../models/experience");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const experiences = await Experience.find().sort("-_id");
  res.send(experiences);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let experience = new Experience({
    user: req.user._id,
    name: data.name,
    location: data.location,
    url: data.url,
    position: data.position,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    isCurrentRole: data.isCurrentRole,
    technologies: data.technologies,
  });
  await experience.save();
  res.send(experience);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    {
      name: data.name,
      location: data.location,
      url: data.url,
      position: data.position,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      isCurrentRole: data.isCurrentRole,
      technologies: data.technologies,
    },
    { new: true }
  );

  if (!experience)
    return res
      .status(404)
      .send("The experience with the given ID was not found.");

  res.send(experience);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const experience = await Experience.findByIdAndRemove(req.params.id);

  if (!experience)
    return res
      .status(404)
      .send("The experience with the given ID was not found.");

  res.send(experience);
});

router.get("/:id", async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience)
    return res
      .status(404)
      .send("The experience with the given ID was not found.");

  res.send(experience);
});

module.exports = router;
