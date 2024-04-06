const c = require("./calc-module");
console.log(arguments);
let x = new c();
console.log("The addition result is ::", x.add(12, 45));
