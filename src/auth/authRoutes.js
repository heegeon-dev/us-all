const router = require("express").Router();
module.exports = (app) => {
    app.use("/api/media", router);
};
