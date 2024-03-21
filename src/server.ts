import fastify from "fastify";
import { z } from "zod";
import { sql } from "./lib/postgres";

const app = fastify();

app.post("/url", async (request, reply) => {
  const { code, url } = z
    .object({
      code: z.string().min(3),
      url: z.string().url(),
    })
    .parse(request.body);

  const result = await sql`
    INSERT INTO short_url (code, original_url)
    VALUES (${code}, ${url})
    RETURNING id
    `;

  const link = result[0];

  return reply.status(201).send({
    shortLinkId: link.id,
  });
});

app
  .listen({
    port: 3333,
  })
  .then((res) => {
    console.log("Server rodando!");
  });
