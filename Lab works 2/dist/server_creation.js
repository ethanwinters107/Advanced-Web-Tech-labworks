const htp= require("http")
let server=htp.createServer((request,response)=>{
    console.log("request received",request.url);
    
    response.write("Meow :3")
    response.end()
})

server.listen(2000,()=>{
    console.log("Server is up");
})