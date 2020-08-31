"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const setup_1 = require("./setup");
const events_1 = __importDefault(require("./events"));
events_1.default();
setup_1.app.use(setup_1.cors());
setup_1.app.use(router_1.default);
setup_1.server.listen(setup_1.PORT, () => console.log(`Server has started on port ${setup_1.PORT}`));
const serverErrorHandler = (err, _, res, __) => {
    const { status = 500 } = err, others = __rest(err, ["status"]);
    res
        .status(status)
        .json(Object.assign({ status_code: status }, others))
        .send();
};
setup_1.app.use(serverErrorHandler);
const closeServer = () => {
    console.log("Closing http server");
    setup_1.server.close(() => {
        console.log("Http server closed.");
    });
};
process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);
setup_1.server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
        console.error(`Port ${setup_1.PORT} is already in use!`);
        return;
    }
    console.error(e);
});
//# sourceMappingURL=index.js.map