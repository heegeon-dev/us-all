const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();
const Logger = require("morgan");
mode = process.env.NODE_ENV;

app.use(Logger(mode == "dev" ? "dev" : "combined"));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
require("./routes")(app);

app.use((req, res, next) => {
    if (!req.timedout) next();
});
(() => {
    app.listen(config.get(`${mode}.port`));
})();
