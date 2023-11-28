require('dotenv').config()
const express = require('express');

const axios = require('axios');
const app = express();
app.use(express.json());
const cors = require('cors');

const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  });

const PORT  = process.env.PORT || 4000;
app.use(cors())
app.listen(PORT,()=>{
    console.log("[*] Server running on port: " + PORT)
});

// lets trick the website into thinking we are a normal browser user, so we dont need to pay for their API
let headers = {
    "Accept": "*/*",
    // "Referer": "https://www.marinetraffic.com/en/ais/details/ships/shipid:439594/mmsi:367191410/imo:9458884/vessel:GO_PURSUIT",
    "Sec-Ch-Ua": "\"Brave\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Vessel-Image": "00625314e3d79abb88072e7135cdd22ca520",
    "X-Requested-With": "XMLHttpRequest"
  }

// lets create a route which will figure out the location of a ship!
app.get('/shipLocation/:shipId', (req, res) => {
    //lets get the ID from the params
    let id = req.params.shipId;
    axios.get("https://www.marinetraffic.com/vesselDetails/latestPosition/shipid:"+id, { headers })
    .then(response => {
        // lets just send this data back to the user!
        res.send({"lat":response.data.lat, "lon":response.data.lon});
    })
    .catch(err => {
        console.log('Error: ', err.message);
        res.send(err);
    });
})

// this one is for our login
app.post('/login', (req, res) => {
    //lets get the ID from the params
    console.log(req.body)
    let username = req.body.username;
    let passwordHash = req.body.passwordHash;

    //lets check if this user exists in our db
    connection.connect();
 
    connection.query('SELECT * FROM users WHERE Username = ?',[username], function (error, results) {
        if (error) throw error;
        if(results.length == 1){
            // lets check the password hash
            // bcrypt
            // .compare(password, hash)
            // .then(resp => {
            //     res.send(resp);
            // })
            // .catch(err => console.error(err.message))      
            if(results[0].passwordHash == passwordHash){
                connection.end();
                res.status(200).send();
            }
        }else if(results.length > 1){
            connection.end();
            console.log("[!] ERROR: Multiple users with this username in the Database: " + username);
            res.status(500).send("ERROR: Multiple users with this username in the Database");
        }else{
            connection.end();
            res.sendStatus(404);
        }
    });
     
})