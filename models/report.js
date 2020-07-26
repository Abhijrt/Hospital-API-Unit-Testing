const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: String,
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
if (!reportSchema.options.toObject) reportSchema.options.toObject = {};
reportSchema.options.toObject.transform = function (doc, ret, options) {
  // delete the passworc and createdAt and UpdatedAt of every document before retuning the result
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  delete ret._id;
  return ret;
};

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
