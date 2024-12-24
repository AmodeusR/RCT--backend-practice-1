import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  list(search) {
    const videos = Array.from(this.#videos.values());
    return videos.filter(video => {
      const title = video.title.toLowerCase();
      
      if (search) {
        const searched = search.toLowerCase();
        return title.includes(searched);
      }

      return true;
    })
  }

  find(id) {
    return this.#videos.get(id);
  }

  create(video) {
    const videoId = randomUUID();
    
    const newVideo = {
      id: videoId,
      ...video
    }
    this.#videos.set(videoId, newVideo)
  }

  update(id, info) {
    const videoToUpdate = this.find(id);
    // const videoToUpdate = this.#videos.get(id);
    console.log(videoToUpdate);

    if (!videoToUpdate) {
      return "Video not found";
    } 
    const updatedVideo = {
      ...videoToUpdate,
      ...info
    }

    this.#videos.set(id, updatedVideo);

    return updatedVideo;
  }

  delete(id) {
    this.#videos.delete(id);
  }

  populate(videos) {
    if (this.#videos.size >= 0) {
      videos.forEach(video => this.create(video));

      return 1;
    }

    return 0;
  }
}