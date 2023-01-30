const router = require("express").Router();

const {
  currentUserGet,
  deleteById,
  GetAllData,
  registration,

  login,
} = require("../controllers/PowerHackUserController");

const auth = require("../MiddleWare/PowerHackUserMiddleWare");

router.post("/registration", registration);
router.post("/login", login);
router.get("/all-users", GetAllData);
router.delete("/user/:id", deleteById);
router.get("/current-user", auth, currentUserGet);

module.exports = router;
