const Joi = require("joi");
const mongoose = require("mongoose");

const Projects = mongoose.model(
  "Projects",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    repositoryUrl: {
      type: String,
      required: true,
    },
    libraries: {
      type: Array,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    primaryLanguage: {
      type: String,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
    startDate: {
      type: Date,
      min: "1990-01-01",
      required: true,
    },
    endDate: {
      type: Date,
      min: "1990-01-02",
      required: false,
    },
    images: {
      type: Array,
      required: true,
    },
    videos: {
      type: Array,
      required: true,
    },
  })
);

function validateProjects(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().required(),
    roles: Joi.array().required(),
    url: Joi.string().required(),
    repositoryUrl: Joi.string().required(),
    libraries: Joi.array().required(),
    category: Joi.string().required(),
    primaryLanguage: Joi.string().required(),
    languages: Joi.array().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    images: Joi.array().required(),
    videos: Joi.array().required(),
  });
  return schema.validate(data);
}

exports.Projects = Projects;
exports.validate = validateProjects;
