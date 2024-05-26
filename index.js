// Built-in Modules
const fs = require("fs"); // File System
const http = require("http"); // Gives us networking capabilities sush as building a Http server
const url = require("url");
// Third-party Module
const slugify = require("slugify");
// My Own Module
const { cardsCreator, productCreator } = require("./modules/creators");

// 📌 Addressing files in node
// when we are importing useing "require" keyword "./" means current directory of the module,
// but in the script "./" means the current directory which we are running node from (where you are running code in your cmd)
// and "__dirname" is the root directory.

// 📌 Files (Blocking, synchronous way)
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${new Date().toLocaleString()}.`;
// fs.writeFileSync("./txt/output.txt", textOut);

// 📌 Files (Non-blocking, asynchronous way)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😁');
//       })
//     });
//   });
// });
// console.log('Will read file!');

// 📌 Server
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const productsJson = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8"
);
const productsArray = JSON.parse(productsJson);

// using third-party dependency
const slugs = productsArray.map((el) =>
  slugify(el.productName, { lower: true })
);
// console.log(slugs);

// console.log(typeof tempOverview); // string
// console.log(typeof productsJson); // string

// The top-level code is only executed once and only in the beginning.
// but this createServer "CALLBACK" function in the bottom gets executed each time there is a new request.

const server = http.createServer((req, res) => {
  // console.log(url.parse(req.url, true));

  // res.end("Hello from the server."); // res.end function, sends back a response to the client.

  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const idQueryParam = parsedUrl.query.id;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    const cards = cardsCreator(productsArray, tempCard);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempOverview.replace("{%PRODUCT_CARDS%}", cards));
  }

  // Product page
  else if (pathName === "/product") {
    const product = productCreator(idQueryParam, productsArray, tempProduct);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(product);
  }

  // API
  else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data); // res.end only accepts string as argument and json is string somehow.
    // });
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(productsJson);
  }

  // 404 Not found
  else {
    res.writeHead(404, {
      // Setting headers must be before sending back a response (befere res.end)
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>404, Page not found.</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("The server is listening to requests...");
});
