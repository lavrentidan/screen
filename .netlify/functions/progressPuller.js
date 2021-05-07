const axios = require('axios')


exports.handler = function(event, context, callback) {
    const url = 'https://infinity-scraper-files.s3.us-east-2.amazonaws.com//tmp/progress.json'

    axios.get(url).then(res => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(res.data)
        })
    })
}