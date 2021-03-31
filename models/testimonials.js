const Joi = require("joi");
const mongoose = require("mongoose");

const Testimonial = mongoose.model(
  "Testimonial",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    position: {
      type: "String",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  })
);

function validateReview(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    image: Joi.string().required(),
    position: Joi.string().required(),
    message: Joi.string().required(),
  });
  return schema.validate(data);
}

exports.Testimonial = Testimonial;
exports.validate = validateReview;
