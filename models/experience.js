const Joi = require("joi");
const mongoose = require("mongoose");

const Experience = mongoose.model(
  "Experiences",
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
    location: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    isCurrentRole: {
      type: Boolean,
      required: true,
      default: false,
    },
    technologies: {
      type: Array,
      required: true,
    },
  })
);

function validateExperience(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    location: Joi.string().required(),
    url: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    isCurrentRole: Joi.boolean().required(),
    technologies: Joi.array().required(),
  });
  return schema.validate(data);
}

exports.Experience = Experience;
exports.validate = validateExperience;
