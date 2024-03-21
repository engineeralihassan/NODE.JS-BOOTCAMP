let fs = require("fs");
const http = require("http");
const { dirname } = require("path");
const url = require("url");
// let fileText = fs.readFileSync("./txt/input.txt", "utf-8");

// let hi = "Hello in the node world";
// console.log(fileText);

//  Write in files in node.js

// let text = "Text which is entered dynamicall i the ali.txt file";
// fs.writeFileSync("./txt/ali.txt", text);
// console.log("Done!");

// write file async way
// let text = "Text which is entered dynamicall i the ali.txt file";
// fs.readFile("./txt/ali.txt", "utf-8", (err, data) => {
//   console.log("I get = ", data);
// });
// console.log("Done!");

//////////////// Server \\\\\\\\\\\\\\\\\\\\\\\\\\
let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
//let dataobj = JSON.parse(data);
let server = http.createServer((req, res) => {
  let pathname = req.url;
  if (pathname == "/" || pathname == "/overview") {
    res.end("<h1>Hellooo Dear its for over view page</h1>");
  } else if (pathname == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen("8000", "127.0.0.1", () => {
  console.log("Your request is start to procced");
});
