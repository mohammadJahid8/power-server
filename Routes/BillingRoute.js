const router = require("express").Router();

const {
  addNewbilling,
  updateBillingData,
  GetAllBillingList,
} = require("../controllers/BillingController");

router.post("/add-billing", addNewbilling);
router.put("/update-billing/:id", updateBillingData);
router.get("/billing-list", GetAllBillingList);

module.exports = router;
