import express from "express";
import router from "./router";
import { app, server, cors, PORT } from "./setup";
import startSocketEvents from "./events";

startSocketEvents();

app.use(cors());
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

const serverErrorHandler: express.ErrorRequestHandler = (err, _, res, __) => {
  const { status = 500, ...others } = err;
  res
    .status(status)
    .json({
      status_code: status,
      ...others,
    })
    .send();
};

app.use(serverErrorHandler);

const closeServer = () => {
  console.log("Closing http server");
  server.close(() => {
    console.log("Http server closed.");
  });
};

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);

server.on("error", (e: NodeJS.ErrnoException) => {
  if (e.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use!`);
    return;
  }
  console.error(e);
});
