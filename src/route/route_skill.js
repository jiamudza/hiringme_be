const express = require("express");
// const verifyToken = require("../../helper(db)/verifyToken");
const router = express();

const profileDashboardSkillController = require("../controller/controller_skill");

router.get("/skill", profileDashboardSkillController.get);
router.get("/skill/:id", profileDashboardSkillController.getSkillById);
router.post("/skill", profileDashboardSkillController.add);
router.patch("/skill/:id", profileDashboardSkillController.update);
router.delete("/skill/:id", profileDashboardSkillController.remove);

module.exports = router;
