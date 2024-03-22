import fastify from "fastify";
import { z } from "zod";
import { sql } from "./lib/postgres";
import postgres from "postgres";
import { redis } from "./lib/redis";

const app = fastify();

app.get("/:code", async (request, reply) => {
  const { code } = z
    .object({
      code: z.string().min(3),
    })
    .parse(request.params);

  const result = await sql`
      SELECT id, original_url
      FROM short_url
      WHERE short_url.code = ${code}
    `;

  if (result.length == 0) {
    return reply.status(400).send({ message: "Link nao encontrado!" });
  }

  const link = result[0];

  await redis.zIncrBy("metrics", 1, String(link.id));

  return reply.redirect(301, link.original_url);
});

app.get("/api/url", async () => {
  const result = await sql`
      SELECT * FROM short_url
      ORDER BY created_at DESC
    `;

  return result;
});

app.post("/api/url", async (request, reply) => {
  const { code, url } = z
    .object({
      code: z.string().min(3),
      url: z.string().url(),
    })
    .parse(request.body);

  try {
    const result = await sql`
      INSERT INTO short_url (code, original_url)
      VALUES (${code}, ${url})
      RETURNING id
    `;

    const link = result[0];

    return reply.status(201).send({
      shortLinkId: link.id,
    });
  } catch (err) {
    if (err instanceof postgres.PostgresError) {
      if (err.code == "23505") {
        return reply.status(400).send({ message: "Código duplicado!" });
      }
    }

    console.error(err);

    return reply.status(500).send({ message: "Internal server error" });
  }
});

app.get("/api/metrics", async () => {
  const result = await redis.zRangeByScoreWithScores("metrics", 0, 50);

  const metrics = result
    .sort((a, b) => b.score - a.score)
    .map((item) => {
      return {
        shortLinkId: Number(item.value),
        clicks: item.score,
      };
    });
  return metrics;
});

app
  .listen({
    port: 3333,
  })
  .then((res) => {
    console.log("Server rodando!");
  });
