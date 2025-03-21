const f=require("fs")
f.writeFile('try.txt',"Meow :3",(a)=>{
    if(a)
    {
        console.error("error writing file",a);
        return
    }
    console.log("file write success");
    
    f.readFile('exp.txt','utf-8',(a,data)=>{
        if(a){
        console.error("error",a)
        }
        console.log(data);

    })
    
})