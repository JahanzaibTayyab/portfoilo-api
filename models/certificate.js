const Joi = require("joi");
const mongoose = require("mongoose");

const Certificate = mongoose.model(
  "Certificate",
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
    awarder: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    url: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      min: "1990-01-01",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  })
);

function validateCertificate(data) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    awarder: Joi.string().min(5).max(100).required(),
    url: Joi.string().required(),
    date: Joi.date().required(),
    image: Joi.string().required(),
  });
  return schema.validate(data);
}
exports.Certificate = Certificate;
exports.validate = validateCertificate;
