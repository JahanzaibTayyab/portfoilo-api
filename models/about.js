const Joi = require("joi");
const mongoose = require("mongoose");
const { socialProfileSchema } = require("./socialProfiles");

const About = mongoose.model(
  "About",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    label: String,
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 255,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    profiles: {
      type: [socialProfileSchema],
    },
    location: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
      default: "Lahore,Punjab,Pakistan",
    },
    yearsOfExperience: Number,
    projectsCompleted: Number,
    cupOfCoffee: Number,
    satisfiedClients: Number,
    nomineesWinner: Number,
  })
);

function validateAbout(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    label: Joi.string().optional(),
    image: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    summary: Joi.string().required(),
    profiles: Joi.array().optional(),
    location: Joi.string().required(),
    region: Joi.string().optional(),
    yearsOfExperience: Joi.number().optional(),
    projectsCompleted: Joi.number().optional(),
    cupOfCoffee: Joi.number().optional(),
    satisfiedClients: Joi.number().optional(),
    nomineesWinner: Joi.number().optional(),
  });
  return schema.validate(data);
}

exports.About = About;
exports.validate = validateAbout;
