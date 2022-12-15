import express from 'express'
import fetch from 'node-fetch'

class Endpoint{
    /**
     * This method checks the geolocation of the user and returns the values of the longitude and latitude.
     * Question:
     * 1. Does a API always have to run between a JS file and a HTML file? 
     */
    Geolocation = () => {
        const app = express();
        app.listen(3000, () => console.log('listening at 3000'));
        app.get('/', function(req, res) {
            res.sendfile('public/geolocation.html')
        })
        app.use(express.json({limit: '1mb'}))
        app.post('/api', (request, response) => {
            if (request.headers['content-type'] == 'application/json') {
                console.log('I got a request!')
                console.log(request.body)
                const data = request.body
                response.json({
                    status: 'succes',
                    latitude: data.lat,
                    longitude: data.lon
                })
                response.status(202).send()
            }
            else{
                response.status(400).send({error: "Invalid body. Content-Type must be 'application/json'"});
            }
        })
    }

    /**
     * @param ip is the input (url) for the method. This is the url that will be checked on multiple criteria (ip, location, city etc)
     * Questions:
     * 1.Is what I did in this method correct? I made a method in this TS file and made a new HTML file. 
     * 2. How do I get the input of the method (ip) to be used as the input for the search in IPdata.html?
     * So what I want to do is let the input of the string of the IPData (for example: zooplus.com) be the criteria that will be check in the IPData.html file.
     * So that the data from zooplus.com is shown 1. on the html page and 2. that I get the correct data back and printed in the terminal.
     * 3. On youtube are a lot of examples/tutoriaks but they don't really go into depth with making multiple API's and using all the different functions of express.
     * do you have an example where I can see how the TS/JS files are made and are interacting with the html files?
     */
    IPData = async (ip: string) => {
        const app = express()
        app.listen(3001, () => console.log('listening at 3001'))
        app.get('/', function(req, res) {
            res.sendfile('public/IPdata.html')
        })
        app.use(express.json({
            limit: '1mb', 
            type: 'application/json'
        }))
        app.post('/ip', (req, res) => {
            console.log('I got a request!')
            console.log(req.body)
        })
    }
}

let API = new Endpoint()
API.Geolocation()
// API.IPData('zoop/lus.com')



