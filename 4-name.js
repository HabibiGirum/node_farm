const os = require('node:os');

const user=os.userInfo()

console.log(user);

console.log(`the system uptime is ${os.uptime}`);


const currentUser={
    // name:os.type(),
    // relesed:os.release(),
    // arch:os.arch(),
    // cpus:os.cpus(),
    hostname:os.hostname(),
   network:os.networkInterfaces(),
    free:os.freemem()
}

console.log(currentUser);