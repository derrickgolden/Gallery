
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const config = require('dotenv').config();
const socketIo = require('socket.io')

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN
const redirectURL = process.env.REDIRECT_URL

const oAuth2Client = new google.auth.OAuth2(clientID,clientSecret,redirectURL)
oAuth2Client.setCredentials({refresh_token: refreshToken})

// console.log(oAuth2Client)
async function sendmail(order){
    try{
        console.log(order)
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                type: "oAuth2",
                user: 'derricknyarangi22@gmail.com',
                clientId: clientID,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                accessToken: accessToken
            }
        })
        
        const mailOptions = {
            from: 'client Name <derricknyarangi22@gmail.com>',
            to: 'goldenderrick95@gmail.com',
            subject: 'painting',
            html: `<h1>The order ${JSON.stringify(order)} </h1>`
        }

        const result = await transport.sendMail(mailOptions)
        return result;
        // return accessToken;
    }catch(err){
        return err
    }
}

// sendmail({try: "hello for now"}).then(data =>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })

module.exports = {sendmail}