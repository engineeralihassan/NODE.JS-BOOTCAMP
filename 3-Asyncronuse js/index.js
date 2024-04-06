const fs = require("fs");
const http = require("superagent");

// CallBacks

// fs.readFile(__dirname + "/dog.txt", "utf-8", (err, data) => {
//   console.log("The data is::", data);
//   http
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((error, res) => {
//       console.log("The dta we get back", res.body.message);

//       fs.writeFile("image-url.txt", res.body.message, (error) => {
//         console.log(error || `Successfully wrote to image-url.txt`);
//       });
//     });
// });

// Promises || Create new Promises
let fileReadPromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/dog.txt", "utf-8", (err, data) => {
      console.log("The data is::", data);
      if (err) reject("File not Found");
      resolve(data);
    });
  });
};
let fileWritePromise = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + "/image-url.txt", data, (err, data) => {
      if (err) reject("Some thing went wrong");
      resolve("Hurray We don this");
    });
  });
};
// fileReadPromise()
//   .then((data) => {
//     return http.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log("The dta we get back", res.body.message);

//     fs.writeFile("image-url.txt", res.body.message, (error) => {
//       console.log(error || `Successfully wrote to image-url.txt`);
//     });
//   })

//   .catch((error) => {
//     console.log(error);
//   });

//   Async Awaite and Try Catch

let printImage = async () => {
  try {
    let data = await fileReadPromise();
    let img = await http.get(`https://dog.ceo/api/breed/${data}/images/random`);

    let final = await fileWritePromise(img.body?.message);
    console.log(final);
  } catch (error) {
    console.log(error);
  }
};
printImage();
