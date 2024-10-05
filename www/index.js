require("dotenv").config({ path: "./config/config.env" });
const { db, populateDb } = require("./integrations/dbModule");
const startServer = require("./api/startServer");

const main = async () => {
    try {
        // Populate the database with synthetic data
        await populateDb();
        console.log("Database populated with synthetic data");

        // Start the server
        startServer();
    } catch (error) {
        console.error("Error during initialization:", error);
        process.exit(1);
    }
};

process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", async (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

main();
