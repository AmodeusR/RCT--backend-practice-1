import fastify from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const database = new DatabaseMemory();

const server = fastify({
  logger: true
});


server.get("/videos", (req, res) => {
  
  return { response: "Worked"}
});

server.post("/videos", () => {
  return "video created"
});

server.put("/videos/:video_id:", () => {

});

server.delete("/videos/:video_id:", () => {

});


server.listen({
  port: 3333
})