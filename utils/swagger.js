import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "SUSHIROOM API documentation using SwaggerUI",
    description: "SUSHIROOM API documentation using SwaggerUI",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["../index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import("../index.js"); // Your project's root file
});
