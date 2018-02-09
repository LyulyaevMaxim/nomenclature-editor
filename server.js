const Hapi = require("hapi");
const Inert = require("inert");
const logger = require("pino")();
const server = new Hapi.Server();
const prefix = "/";

server.connection({
  port: process.env.PORT || 5000,
  routes: {
    cors: true
  }
});

server.register(Inert, () => {
  server.route({
    method: "GET",
    path: prefix + "fonts/{param*}",
    handler: {
      directory: {
        path: "./build/fonts",
        redirectToSlash: true,
        index: true
      }
    }
  });

  server.route({
    method: "GET",
    path: prefix + "img.css",
    handler: {
      file: "./build/img.css"
    }
  });

  server.route({
    method: "GET",
    path: prefix + "img/{param*}",
    handler: {
      directory: {
        path: "./build/img/",
        redirectToSlash: true,
        index: true
      }
    }
  });

  server.route({
    method: "GET",
    path: prefix + "js/{param*}",
    handler: {
      directory: {
        path: "./build/js/",
        redirectToSlash: true,
        index: true
      }
    }
  });

  server.route({
    method: "GET",
    path: prefix + "css/{param*}",
    handler: {
      directory: {
        path: "./build/css",
        redirectToSlash: true,
        index: true
      }
    }
  });

  server.route({
    method: "GET",
    path: prefix + "{path*}",
    handler: {
      file: "./build/index.html"
    }
  });

  server.start(err => {
    if (err) {
      throw err;
    }
    logger.info("Server running at:", server.info.uri);
  });
});
