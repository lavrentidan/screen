
// const fetch = require('node-fetch');
// const request = require('request');
// const { stringify } = require('uuid');


const url = "https://infinity-scraper-files.s3.us-east-2.amazonaws.com//tmp/houses.json"
// const settings = {method: "Get"}


// var importedJSON;

// request(url, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         importedJSON = JSON.parse(body);
//     }
// })



// exports.handler = async function (event, context) {
//     return {
//         statusCode: 200,
//         body: JSON.stringify({houses: importedJSON})
//     }
// }



// -------------------------------------------------------------------


const axios = require('axios')

// exports.handler = async (event, context) => {
//     const body = JSON.parse(event.body)
//     const res = await axios.get(body.url)

//     return {
//         statusCode: res.status,
//         body: JSON.stringify(res.data)
//     }
// }

// axios.get('https://infinity-scraper-files.s3.us-east-2.amazonaws.com//tmp/houses.json')
//     .then(res => {
//         houses = res.data;
//     })


exports.handler = function(event, context, callback) {
    const url = 'https://infinity-scraper-files.s3.us-east-2.amazonaws.com//tmp/houses.json'

    axios.get(url).then(res => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(res.data)
        })
    })
}