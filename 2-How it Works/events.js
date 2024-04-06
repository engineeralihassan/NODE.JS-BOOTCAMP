const EventEmmiter = require("events");
let myEvent = new EventEmmiter();

myEvent.on("newEvent", () => {
  console.log("The even emmiter for the new event is listened");
});

myEvent.on("newEvent", () => {
  console.log("The even emmiter is emitted just know");
});
myEvent.on("newUser", (data) => {
  console.log(
    "The event emiitersend new data::",
    "name:",
    data.name,
    "toTal Number of users till now:",
    data.number
  );
});

myEvent.emit("newEvent");
myEvent.emit("newUser", { name: "John Doe", number: 7 });

//////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😀");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
