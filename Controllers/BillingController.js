const BillingModel = require("../models/BillingModel");
const axios = require("axios");

const generateBillId = () => {
  const otp = Math.floor(Math.random() * 10000);
  if (otp.toString().length === 4) {
    return otp;
  } else {
    return generateBillId();
  }
};

exports.addNewbilling = async (req, res) => {
  try {
    const billId = generateBillId();
    const data = new BillingModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      paidAmount: req.body.paidAmount,
      BillingId: billId,
    });
    const result = await data.save();
    return res.status(200).json({
      message: "New bill added successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
