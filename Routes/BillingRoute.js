const router = require("express").Router();

const {
  addNewbilling,
  updateBillingData,
} = require("../controllers/BillingController");

router.post("/add-billing", addNewbilling);
router.put("/update-billing/:id", updateBillingData);

module.exports = router;
