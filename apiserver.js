const express = require("express");
const yaml = require("js-yaml");
const fs = require("fs");

const app = express();

const config = yaml.safeLoad(fs.readFileSync("serverconfig.yaml", "utf8"));

const port = config.port || 3800;

app.listen(`cms RESTAPI server is running on ${port}`);
