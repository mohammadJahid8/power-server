const router = require("express").Router();

const { addNewbilling } = require("../controllers/BillingController");

router.post("/add-billing", addNewbilling);

module.exports = router;
