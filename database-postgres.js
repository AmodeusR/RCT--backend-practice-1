import { randomUUID } from "node:crypto";
import sql from "./db.js";

export class DatabasePostgres {

  async list(search) {
    
    const query = search ?
      sql`
        SELECT * FROM videos
        WHERE title ILIKE ${"%" + search + "%"};
    `
    :
      sql`
      SELECT * FROM videos;
      `
    ;
    
    const videos = await query;
  
    return videos;
  }

  async find(id) {
    const video = await sql`
      SELECT * FROM videos
      WHERE id = ${id};
    `

    return video;
  }

  async create(video) {
    const videoId = randomUUID();

    const { title, description, duration } = video;

    await sql`
      INSERT INTO videos (id, title, description, duration)
      VALUES (${videoId}, ${title}, ${description}, ${duration});
    `
  }

  async update(id, info) {
    const { title, description } = info;

    await sql`
      UPDATE videos
      SET
        title = COALESCE(${title ?? null}, title),
        description = COALESCE(${description ?? null}, description)
      WHERE id = ${id};
    `;
  }

  async delete(id) {
    await sql`
      DELETE FROM videos WHERE id = ${id}
    `
  }

  async populate(videos) {
    const isDatabasePopulated = await sql`
      SELECT COUNT(*) FROM videos; 
    `;

    if (isDatabasePopulated) {
      return 0;
    }

    videos.forEach(async video => {
      await this.create(video);
    });
    
    return 1;
  }
}