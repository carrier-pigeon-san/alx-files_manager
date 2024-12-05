# Files Manager

## Description
This project is about the implementation of a simple platform to upload and view files using various backend concepts and tools such as authentication, MongoDB, Redis, pagination, and background processing.

## Features
- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

## Objectives
- how to create an API with Express
- how to authenticate a user
- how to store data in MongoDB
- how to store temporary data in Redis
- how to setup and use a background worker

## Project Structure
```
alx-files_manager/
├── controllers
│   ├── AppController.js
│   ├── AuthController.js
│   ├── FilesController.js
│   └── UsersController.js
├── routes
│   └── index.js
├── utils
│   ├── redis.js
│   └── db.js
├── server.js
└── worker.js
```

## Stack
- NodeJS
- ExpressJS
- MongoDB
- Redis
- Mocha

## Dependencies
- Chai
- Nodemon
- Bull
- Request
- Sinon
- Mime-types
- Image-thumbnail

## Author
[Sandy Obare](https://github.com/carrier-pigeon-san/)
