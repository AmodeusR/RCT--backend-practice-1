import fastify from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const database = new DatabasePostgres;

const server = fastify({
  logger: true
});

server.get("/videos", async (request) => {
  const search = request.query.search;
  
  const videos = await database.list(search);
  
  return videos;
});

server.get("/videos/:id", async (request) => {
  const id = request.params.id;

  return await database.find(id)
});

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration
  });

  return reply.status(201).send();
});

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const data = request.body;

  await database.update(videoId, data);

  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const id = request.params.id;

  await database.delete(id);

  return reply.status(204).send;
});


// Database population route

server.post("/populate", (request, reply) => {
  const videos = [
    {
      title: "Learn node right away!",
      description: "In this video we are going to learn more about node backend development",
      duration: 308
    },
    {
      title: "The right way to learn a new programming language",
      description: "",
      duration: 157
    },
    {
      title: "How to use Nodemon",
      description: "In this video we are going to learn how to use nodemon to run a node backend server",
      duration: 432
    },
  ];

  const result = database.populate(videos);

  if (result === 1) {
    return reply.status(201).send();
  }

  return {
    message: "Already populated"
  };
});


server.listen({
  port: 3333
})