const express = require("express");
const cors = require("cors");
const compression = require("compression");
const user = require("./user");
const getQuiz = require("./getQuiz");
const postModule = require("./postModule");
const recommendation = require("./recommendation");
const getModules = require("./getModules");
const getModuleDetails = require("./getModuleDetails");
const getQuizFromLocalStorage = require("./getQuizFromLocalStorage");

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
    app.get("/api/quiz", getQuiz); // have to specify the moduleId as well
    app.get('/api/module/:moduleId', getModuleDetails);
    app.get("/api/modules", getModules);
    app.post("/api/module", postModule);
    app.get("/api/recommendation", recommendation);
    app.get("/api/getQuizFromLocalStorage/:id", getQuizFromLocalStorage);

    return app;
}

module.exports = getApp;
