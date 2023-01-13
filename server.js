const express = require('express');
const {sendmail} = require('./public/js/mail.js');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 8080;

const app = express()
const server = http.createServer(app);
const io = socketIo(server);

// setting up the sockets
io.on('connection', async (socket)=>{
    console.log("client connected")
    socket.on('order',(order)=>{
        const result = sendmail(order)
        result.then(data =>{
            if(/250 2.0.0 OK/.test(data.response)){
                io.emit('success',data.response)
            }else{
                io.emit('error', "Failed")
            }
            console.log(data.response)
        }).catch(err =>{
            io.emit('error', "Failed")
            console.log(err)
        })
        // console.log(order)
    })
})


//static files
app.use(express.static('public'))
app.use("/css", express.static(__dirname + 'public/css'))
// app.use("/img", express.static(__dirname + 'public/img'))
// app.use("/js", express.static(__dirname + 'public/js'))

app.get('/golden/*',getHome)
server.listen(PORT,()=>console.log("Listening on port", PORT))



const {readFile, createReadStream, rmSync} = require('fs')
const path = require('path')

// const filePath = ""
async function getHome(req,res){
    let filePath = "";
    console.log(req.params[0])
    if(/^(home|art|index|gallery|biography|commission)$/.test(req.params[0])){
        filePath = path.join(`${__dirname}/${req.params[0]}.html`)
    }else{
        filePath = path.join(`${__dirname}/${req.params[0]}`)
        console.log(filePath)
    }
    createReadStream(filePath)
        .on("error",() => notFound(req,res))
        .pipe(res)
}

function notFound(req,res){
    res.writeHead(404,{"Content-Type":"text/plain"})
    res.end(`Page Not Found, Try Later`)
}