const { Router } = require("express");

const { findAllTypesHandler } = require("../controlers/handlers/typeHandler");

const router = Router();

router.get("/", findAllTypesHandler);

module.exports = router;
