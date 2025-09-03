const express = require("express");
const router = express.Router();
const {getServices,createService,updateService,softDeleteService,restoreService} = require("../Contollers/serviceController");

router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", softDeleteService);
router.patch("/:id/restore", restoreService);

module.exports = router;
