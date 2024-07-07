const app = require("./app.js");
const http = require("http"); // Usaremos HTTP en lugar de HTTPS
const { PORT } = require("./config.js");

try {
    const server = http.createServer(app); // Creamos un servidor HTTP

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("An error occurred while starting the server:", error);
}
