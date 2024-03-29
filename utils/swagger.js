import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "SUSHIROOM API Docs",
    description:
      "SUSHIROOM API documentation documentation using SwaggerUI and swagger-autogen",
  },
  host: "localhost:5000",
  servers: [
    { url: "http://localhost:5000" },
    { url: "https://sushi-room-backend.up.railway.app" },
  ],
  tags: [
    {
      name: "App",
    },
    {
      name: "Items",
    },
    {
      name: "Auth",
    },
    {
      name: "Upload",
    },
    {
      name: "Upload",
    },
  ],
  definitions: {
    Item: {
      imageUrl: "a",
      title: "a",
      price: 300,
      quantity: 2,
      weight: 300,

      description: "a",
      compounds: "a",

      category: "a",

      rating: 1,
    },
    User: {
      fullName: "a",
      email: "a@gmail.com",
      phoneNumber: "+380666719894",
      passwordHash: "eafewfewfewfewffewvewgwf",
      favourites: [{ id: "ef1r31qf" }],
    },
    Ad: {
      imageUrl: "images.com/image1",
      title: "ad name",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const options = {
  openapi: "3.0.0", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: true, // Enable/Disable automatic headers capture. By default is true
  autoQuery: true, // Enable/Disable automatic query capture. By default is true
  autoBody: true, // Enable/Disable automatic body capture. By default is true
};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["../index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
  await import("../index.js"); // Your project's root file
});
