const BillingModel = require("../models/BillingModel");
const axios = require("axios");

const generateBillId = (counter = 0) => {
  if (counter > 100) return -1;

  const otp = Math.floor(Math.random() * 10000);
  if (otp.toString().length === 4) {
    return otp;
  } else {
    return generateBillId(counter + 1);
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

exports.updateBillingData = async (req, res) => {
  try {
    const data = await BillingModel.findById(req.params.id);

    const result = await data.updateOne({
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        paidAmount: req.body.paidAmount,
      },
    });

    return res.status(200).json({
      message: "Updated billing data!",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while updating!",
    });
  }
};

exports.GetAllBillingList = async (req, res) => {
  const data = await BillingModel.find({});
  const reverseData = data.reverse();
  return res.status(200).json({
    message: "Success",
    result: reverseData,
  });
};

exports.deleteBillingData = async (req, res) => {
  try {
    const data = await BillingModel.findById(req.params.id);
    const result = await data.remove();
    return res.status(200).json({
      message: "Successfully deleted the bill!",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.getBillingDataWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const data = await BillingModel.find({});
    const results = data.slice(startIndex, endIndex);
    const reverseData = results.reverse();
    const totalDocuments = await BillingModel.countDocuments({});
    const totalPages = Math.ceil(totalDocuments / limit);

    return res.status(200).json({
      message: "Success",
      result: reverseData,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
