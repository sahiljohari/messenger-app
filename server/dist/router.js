"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get("/", (_, res) => {
    res.send("server is up and running");
});
exports.default = router;
//# sourceMappingURL=router.js.map