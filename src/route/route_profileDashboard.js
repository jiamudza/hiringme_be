const express = require("express");
// const verifyToken = require("../../helper(db)/verifyToken");
const router = express();

const profileDashboardController = require("../controller/controller_profileDashboard");

router.get("/", profileDashboardController.get);
router.get("/:id", profileDashboardController.getDetail);
router.post("/", profileDashboardController.add);
router.patch("/:id", profileDashboardController.update);
router.delete("/:id", profileDashboardController.remove);

module.exports = router;
