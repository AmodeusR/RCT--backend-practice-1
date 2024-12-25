# Video API backend practice

This is a simple project practice for getting in touch with backend development. With this API, it's possible to create, update, delete, list existing videos and much more.

## How to run

Run npm start in the terminal and it'll be ready to go.  
You can access the route `/populate` to add some mock data into the database.

The main branch runs through a in-memory database. The Postgres branch works using the PostgreSQL database.

## Available routes

Below is the description of each route available. You can also see the available routes in the routes.http file.

### List all videos

**GET** `/videos`  
Retrieve a list of all videos.

### Get one video

**GET** `/videos/{id}`  
Retrieve details of a specific video by its `id`.

### Create a video

**POST** `/videos`  
**Headers**: `Content-Type: application/json`  
**Body**:  

```json
{
  "title": "The best emulators of 2024",
  "description": "Find out what were the best emulators of this year",
  "duration": 507
}
```

Create a video with the given details.

### Update a video

**PUT** `/videos/{id}`  
**Headers**: `Content-Type: application/json`  
**Body**:

```json
{
  "title": "The best emulators of 2025"
}
```

Update an existing video with the given details

### Delete a video

**DELETE** `/videos/{id}`
**Headers**: `Content-Type: application/json`  
Deletes an existing video

### Populate database

**POST** `/populate`  
Populates the database with mock data
