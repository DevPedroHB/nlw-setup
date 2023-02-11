import { FastifyInstance } from "fastify";
import WevPush from "web-push";
import { z } from "zod";

const publicKey = String(process.env.NOTIFICATION_PUBLIC_KEY);
const privateKey = String(process.env.NOTIFICATION_PRIVATE_KEY);

console.log({
  privateKey,
  publicKey,
});

WevPush.setVapidDetails(
  "https://habits-server-r78d.onrender.com",
  publicKey,
  privateKey
);

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
