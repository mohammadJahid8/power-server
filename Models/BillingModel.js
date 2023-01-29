const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    paidAmount: {
      type: Number,
    },
    BillingId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("BillingSchemaModel", BillingSchema);
module.exports = model;
