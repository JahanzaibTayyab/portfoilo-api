const { Certificate, validate } = require("../models/certificate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Certificate.find(req.user._id);
  res.send(projects);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let certificate = new Certificate({
    user: req.user._id,
    title: data.title,
    awarder: data.awarder,
    url: data.url,
    date: data.date,
    image: data.image,
  });
  await certificate.save();
  res.send(certificate);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const certificate = await Certificate.findByIdAndUpdate(
    req.params.id,
    {
      title: data.title,
      awarder: data.awarder,
      url: data.url,
      date: data.date,
      image: data.image,
    },
    { new: true }
  );

  if (!certificate)
    return res
      .status(404)
      .send("The certificate with the given ID was not found.");

  res.send(certificate);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const certificate = await Certificate.findByIdAndRemove(req.params.id);

  if (!certificate)
    return res
      .status(404)
      .send("The certificate with the given ID was not found.");

  res.send(certificate);
});
module.exports = router;
