const router = require("express").Router();

const {
  addNewbilling,
  updateBillingData,
  GetAllBillingList,
  deleteBillingData,
} = require("../controllers/BillingController");

router.post("/add-billing", addNewbilling);
router.put("/update-billing/:id", updateBillingData);
router.get("/billing-list", GetAllBillingList);
router.delete("/delete-billing/:id", deleteBillingData);

module.exports = router;
