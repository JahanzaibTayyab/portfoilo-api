const Joi = require("joi");
const mongoose = require("mongoose");

const Skills = mongoose.model(
  "Skills",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    level: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  })
);

function validateSkill(data) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    level: Joi.string().min(5).max(100).required(),
    value: Joi.number().min(0).max(100).required(),
  });
  return schema.validate(data);
}
exports.Skills = Skills;
exports.validate = validateSkill;
