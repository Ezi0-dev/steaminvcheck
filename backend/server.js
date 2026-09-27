const Fastify = require("fastify");
const cors = require("@fastify/cors")

const app = Fastify();

app.register(cors, {
    origin: true
});

app.get("/api/inventory/:steamId", async (req, reply) => {
    const { steamId } req.params;

    const url =
        `https://steamcommunity.com/inventory/${steamId}/440/2` +
        `?l=english&count=5000`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    if (!response.ok) {
        return reply
            .code(response.status)
            .send({ error: `Steam returned ${response.status}` });
    }

    const data = await response.json();

    return data;
});

app.listen({ port: 3000 }, () => {
    console.log("Backend running on http://localhost:3000")
})