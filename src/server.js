const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();
const Logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
let swaggerUi = require("swagger-ui-express");
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');

mode = process.env.NODE_ENV;

app.use(Logger(mode == "dev" ? "dev" : "combined"));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

try {
    let swaggerDefinition = yaml.load(fs.readFileSync(path.join(__dirname, "../config/swagger.yml"), 'utf8'));
    const specs = swaggerJSDoc({ swaggerDefinition: swaggerDefinition, apis: ['../src/routes/*.js'] });
    app.use("/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );

} catch (e) {
    console.log(e);
}

require("./routes")(app);

app.use((req, res, next) => {
    if (!req.timedout) next();
});
(() => {
    app.listen(config.get(`${mode}.port`));
})();
