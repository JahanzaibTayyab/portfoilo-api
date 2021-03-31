const { Projects, validate } = require("../models/projects");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Projects.find(req.user._id);
  res.send(projects);
});
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  let project = new Projects({
    user: req.user._id,
    name: data.name,
    description: data.description,
    roles: data.roles,
    url: data.url,
    repositoryUrl: data.repositoryUrl,
    libraries: data.libraries,
    category: data.category,
    primaryLanguage: data.primaryLanguage,
    languages: data.languages,
    startDate: data.startDate,
    endDate: data.endDate,
    images: data.images,
    videos: data.videos,
  });
  await project.save();
  res.send(project);
});
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let data = req.body;
  const project = await Projects.findByIdAndUpdate(
    req.params.id,
    {
      name: data.name,
      description: data.description,
      roles: data.roles,
      url: data.url,
      repositoryUrl: data.repositoryUrl,
      libraries: data.libraries,
      category: data.category,
      primaryLanguage: data.primaryLanguage,
      languages: data.languages,
      startDate: data.startDate,
      endDate: data.endDate,
      images: data.images,
      videos: data.videos,
    },
    { new: true }
  );

  if (!project)
    return res.status(404).send("The project with the given ID was not found.");

  res.send(project);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const project = await Projects.findByIdAndRemove(req.params.id);

  if (!project)
    return res.status(404).send("The project with the given ID was not found.");

  res.send(project);
});
module.exports = router;
