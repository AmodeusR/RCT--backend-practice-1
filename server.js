import fastify from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const database = new DatabaseMemory();

const server = fastify({
  logger: true
});


server.get("/videos", () => {
  const videos = database.list();
  
  return videos;
});

server.get("/video/:id", (request, reply) => {
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

server.put("/videos/:video_id:", () => {

});

server.delete("/videos/:video_id:", () => {

});


server.listen({
  port: 3333
})