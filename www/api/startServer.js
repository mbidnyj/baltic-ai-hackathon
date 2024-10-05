const getApp = require("./expressApp");
const http = require("http");

function startServer() {
    const app = getApp();
    const PORT = process.env.PORT || 3000;

    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = startServer;
