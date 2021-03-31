const Joi = require("joi");
const mongoose = require("mongoose");

const Education = mongoose.model(
  "Education",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    institution: {
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
    grade: {
      type: String,
      required: false,
    },
  })
);

function validateEducation(data) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    institution: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    grade: Joi.string().optional(),
  });
  return schema.validate(data);
}

exports.Education = Education;
exports.validate = validateEducation;
