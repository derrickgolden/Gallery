const express = require('express')

const PORT = process.env.PORT || 8000;

const app = express()

// app.use('/',(req,res)=>{
//     res.sendStatus(200)
// })
app.get('/*',getHome)
app.listen(PORT,()=>console.log("Listening on port", PORT))

const {readFile, createReadStream, rmSync} = require('fs')
const path = require('path')

async function getHome(req,res){
    const filePath = path.join(`${__dirname}/${req.params[0]}`)
    createReadStream(filePath)
        .on("error",() => notFound(req,res))
        .pipe(res)
}

function notFound(req,res){
    res.writeHead(404,{"Content-Type":"text/plain"})
    res.end("Page Not Found")
}