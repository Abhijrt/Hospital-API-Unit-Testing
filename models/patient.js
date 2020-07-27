const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  {
    timestamps: true,
  }
);

// to remove a password from an instance
if (!patientSchema.options.toObject) patientSchema.options.toObject = {};
patientSchema.options.toObject.transform = function (doc, ret, options) {
  // delete the passworc and createdAt and UpdatedAt of every document before retuning the result
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  return ret;
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
