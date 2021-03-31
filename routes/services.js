const { Service, validate } = require("../models/services");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.find();
  res.send(services);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let service = new Service({
    user: req.user._id,
    name: data.name,
    description: data.description,
  });
  await service.save();
  res.send(service);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    {
      name: data.name,
      description: data.description,
    },
    { new: true }
  );

  if (!service)
    return res.status(404).send("The service with the given ID was not found.");

  res.send(service);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const service = await Service.findByIdAndRemove(req.params.id);

  if (!service)
    return res.status(404).send("The service with the given ID was not found.");

  res.send(service);
});

router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service)
    return res.status(404).send("The service with the given ID was not found.");

  res.send(service);
});

module.exports = router;
