const express = require("express");
// const verifyToken = require("../../helper(db)/verifyToken");
const router = express();

const profileDashboardSocmedController = require("../controller/controller_socialmedia");

router.get("/socmed", profileDashboardSocmedController.get);
router.get("/socmed/:id", profileDashboardSocmedController.getSocmedById);
router.post("/socmed", profileDashboardSocmedController.add);
router.patch("/socmed/:id", profileDashboardSocmedController.update);
router.delete("/socmed/:id", profileDashboardSocmedController.remove);

module.exports = router;
