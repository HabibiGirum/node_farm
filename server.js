const http = require('http');

console.log(http);

const server=http.createServer((req,res)=>{
    res.write('hello the world')
    res.end()
})


server.listen(5000)

hh