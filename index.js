const Appliation = require("./app/server");

new Appliation(
  8282,
  //"mongodb://127.0.0.1:27017"
  "mongodb://test:test@193.242.208.19:3521/?tls=false"
);
