const { About, validate } = require("../models/about");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const about = await About.find();
  res.send(about);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let about = new About({
    user: req.user._id,
    name: data.name,
    label: data.label,
    image: data.image,
    email: data.email,
    phone: data.phone,
    summary: data.summary,
    profiles: data.profiles,
    location: data.location,
    region: data.region,
    yearsOfExperience: data.yearsOfExperience,
    projectsCompleted: data.projectsCompleted,
    cupOfCoffee: data.cupOfCoffee,
    satisfiedClients: data.satisfiedClients,
    nomineesWinner: data.nomineesWinner,
  });
  await about.save();
  res.send(about);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const about = await About.findByIdAndUpdate(
    req.params.id,
    {
      name: data.name,
      label: data.label,
      image: data.image,
      email: data.email,
      phone: data.phone,
      summary: data.summary,
      profiles: data.profiles,
      location: data.location,
      region: data.region,
      yearsOfExperience: data.yearsOfExperience,
      projectsCompleted: data.projectsCompleted,
      cupOfCoffee: data.cupOfCoffee,
      satisfiedClients: data.satisfiedClients,
      nomineesWinner: data.nomineesWinner,
    },
    { new: true }
  );

  if (!about)
    return res.status(404).send("The about with the given ID was not found.");

  res.send(about);
});

module.exports = router;
