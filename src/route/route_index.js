const express = require("express");
const router = express();

//import route mvp
const authRoute = require("../route/route_auth");
const profileDashboardSkillRoute = require("../route/route_skill");
const profileDashboardSocmed = require("../route/route_socialmedia");
// end

router.get("/", (req, res) => {
  return res.send("Backend for Hiringme");
});

// route.use("/apa", panggil inisial importnya)
router.use("/auth", authRoute);
router.use("/profileDashboard", profileDashboardSkillRoute);
router.use("/profileDashboard", profileDashboardSocmed);
//end

module.exports = router;
