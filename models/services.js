const Joi = require("joi");
const mongoose = require("mongoose");

const Service = mongoose.model(
  "Services",
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
  })
);

function validateService(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
}

exports.Service = Service;
exports.validate = validateService;
