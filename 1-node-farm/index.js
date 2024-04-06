let fs = require("fs");
const http = require("http");
const { dirname } = require("path");
const url = require("url");

// Require ir used the third party modules
const slugify = require("slugify");

//  Rquire our own buld module
const changeTemplates = require("./modules/changeTemplate");
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
let tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
let tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
let tempCard = fs.readFileSync(
  `${__dirname}/templates/card-template.html`,
  "utf-8"
);
let dataObj = JSON.parse(data);
let server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObj
      .map((el) => changeTemplates(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = changeTemplates(tempProduct, product);
    res.end(output);

    // API
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
