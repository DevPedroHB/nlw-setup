import { FastifyInstance } from "fastify";
import WevPush from "web-push";
import { z } from "zod";

const publicKey =
  "BJkbFo7RwnhdsjzomkVEjxHDAOWvK63ndEh_FX59md6X5fLNlkb1sunWuTfzLTvydVHqjZd_x05Zk3TsA3bwSI0";
const privateKey = "GjXZySBXx-XMA_EC52ApCy8Y84xDZ7fS2rA_TKZK4SQ";

WevPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return { publicKey };
  });

  app.post("/push/register", (request, reply) => {
    console.log(request.body);

    return reply.status(201).send();
  });

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    WevPush.sendNotification(subscription, "HELLO DO BACKEND");

    return reply.status(201).send();
  });
}
