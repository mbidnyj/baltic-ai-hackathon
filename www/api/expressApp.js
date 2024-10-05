const express = require("express");
const cors = require("cors");
const compression = require("compression");
const user = require("./user");
const getModule = require("./getModule");
const postModule = require("./postModule");
const recommendation = require("./recommendation");
const getModules = require("./getModules");

function getApp() {
    const app = express();

    app.use(cors());
    app.use(compression()); // Enable gzip compression

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.use(express.json());
    app.use(express.static("public"));

    app.get("/api/user", user);
    app.get("/api/module", getModule);
    app.get("/api/modules", getModules);
    app.post("/api/module", postModule);
    app.get("/api/recommendation", recommendation);

    return app;
}

module.exports = getApp;
