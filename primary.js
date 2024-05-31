//https://www.digitalocean.com/community/tutorials/how-to-scale-node-js-applications-with-clustering
import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
  args:[process.argv[2]],	
  exec: __dirname + "/digikala.js", 
});

for (let i = 0; i < 3; i++) {
  cluster.fork();
}
cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  cluster.fork();
});


cluster.on("error", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} error occured`);
  console.log("Starting another worker");
  cluster.fork();
});

cluster.on("death", (worker) => {
  console.log(`worker ${worker.process.pid} error occured`);
  console.log("Starting another worker");
  cluster.fork();
});

