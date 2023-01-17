import cors from "@fastify/cors";
import Fastify from "fastify";

const app = Fastify();

app.register(cors);

app.get("/", () => {
  console.log("Hello World");
});

app.listen({
  port: 3333,
});
