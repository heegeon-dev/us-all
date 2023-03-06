const router = require("express").Router();
module.exports = (app) => {
    //getFileInS3(버켓내부디렉터리)
    app.use("/api/media", router);
};
