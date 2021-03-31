const { Testimonial, validate } = require("../models/testimonials");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const testimonials = await Testimonial.find().sort("name");
  res.send(testimonials);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let testimonial = new Testimonial({
    user: req.user._id,
    name: data.name,
    email: data.email,
    image: data.image,
    position: data.position,
    message: data.message,
  });
  await testimonial.save();
  res.send(testimonial);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    {
      name: data.name,
      email: data.email,
      image: data.image,
      position: data.position,
      message: data.message,
    },
    { new: true }
  );

  if (!testimonial)
    return res
      .status(404)
      .send("The testimonial with the given ID was not found.");

  res.send(testimonial);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const testimonial = await Testimonial.findByIdAndRemove(req.params.id);

  if (!testimonial)
    return res
      .status(404)
      .send("The testimonial with the given ID was not found.");

  res.send(testimonial);
});

router.get("/:id", async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial)
    return res
      .status(404)
      .send("The testimonial with the given ID was not found.");

  res.send(testimonial);
});

module.exports = router;
