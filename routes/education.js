const { Education, validate } = require("../models/education");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const educations = await Education.find().sort("-_id");
  res.send(educations);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let education = new Education({
    user: req.user._id,
    title: data.title,
    institution: data.institution,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    grade: data.grade,
  });
  await education.save();
  res.send(education);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const education = await Education.findByIdAndUpdate(
    req.params.id,
    {
      title: data.title,
      institution: data.institution,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      grade: data.grade,
    },
    { new: true }
  );

  if (!education)
    return res
      .status(404)
      .send("The education with the given ID was not found.");

  res.send(education);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const education = await Education.findByIdAndRemove(req.params.id);

  if (!education)
    return res
      .status(404)
      .send("The education with the given ID was not found.");

  res.send(education);
});

router.get("/:id", async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (!education)
    return res
      .status(404)
      .send("The education with the given ID was not found.");

  res.send(education);
});

module.exports = router;
