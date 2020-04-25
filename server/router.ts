import express = require("express");
const router = express.Router();

router.get("/", (_, res: express.Response) => {
  res.send("server is up and running");
});

export default router;
