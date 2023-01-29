// const { string } = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PowerHackUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

PowerHackUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

PowerHackUserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  if (!this.password) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const model = mongoose.model("PowerHackUser", PowerHackUserSchema);
module.exports = model;
