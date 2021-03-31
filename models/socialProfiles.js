const Joi = require("joi");
const mongoose = require("mongoose");

const socialProfileSchema = new mongoose.Schema({
  network: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  url: {
    type: String,
    required: true,
  },
});
const SocialProfiles = mongoose.model("SocialProfiles", socialProfileSchema);

function validateProfiles(data) {
  const schema = Joi.object({
    network: Joi.string().required(),
    username: Joi.string().min(5).max(100).required(),
    url: Joi.string().required(),
  });
  return schema.validate(data);
}
exports.socialProfileSchema = socialProfileSchema;
exports.SocialProfiles = SocialProfiles;
exports.validate = validateProfiles;
