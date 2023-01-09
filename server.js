const express = require('express')

const PORT = process.env.PORT || 8000;

const app = express()

//static files
app.use(express.static('public'))
app.use("/css", express.static(__dirname + 'public/css'))
// app.use("/img", express.static(__dirname + 'public/img'))
// app.use("/js", express.static(__dirname + 'public/js'))

app.get('/golden/*',getHome)
app.listen(PORT,()=>console.log("Listening on port", PORT))

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     )
//     next()
//   })

const {readFile, createReadStream, rmSync} = require('fs')
const path = require('path')

// const filePath = ""
async function getHome(req,res){
    const filePath = path.join(`${__dirname}/${req.params[0]}`)
    console.log(filePath)
    createReadStream(filePath)
        .on("error",() => notFound(req,res))
        .pipe(res)
}

function notFound(req,res){
    res.writeHead(404,{"Content-Type":"text/plain"})
    res.end(`Page Not Found, Try Later`)
}