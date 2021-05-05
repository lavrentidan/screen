import axios from 'axios';
import fetch from 'node-fetch';



let houses;

let url = "https://infinity-scraper-files.s3.us-east-2.amazonaws.com//tmp/houses.json"
let options = {
    json: true,
};

request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode === 200) {
        console.log(body)
        houses = body
    };
});

export default houses

