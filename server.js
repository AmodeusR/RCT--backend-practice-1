import fastify from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const database = new DatabaseMemory();

const server = fastify({
  logger: true
});

server.get("/videos", (request) => {
  const search = request.query.search;
  
  const videos = database.list(search);
  
  return videos;
});

server.get("/videos/:id", (request, reply) => {
  const id = request.params.id;

  return database.find(id)
});

server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;

  database.create({
    title,
    description,
    duration
  });

  return reply.status(201).send();
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const data = request.body;

  const updatedVideo = database.update(videoId, data);

  console.log(updatedVideo);

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const id = request.params.id;

  database.delete(id);

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