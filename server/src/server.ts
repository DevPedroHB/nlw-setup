import cors from "@fastify/cors";
import Fastify from "fastify";
import { notificationRoutes } from "./notification-routes";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);
app.register(notificationRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then((url) => {
    console.log(`HTTP server running on ${url}`);
  });
