const { default: fetch } = require("node-fetch");
const axios = require('axios')





const globalRegex = new RegExp(/([*])\w+/);


let dirtyProgress;

// Parses the json data and save it to a variable




exports.handler = function(event, context, callback) {
    const url = 'https://infinity-scraper-files.s3.us-east-2.amazonaws.com//tmp/progress.json'

    axios.get(url).then(houses_progress => {
        let lel = houses_progress
        let finalArray = []
        let newArray = []
        let newNewArray = []


        // Set newArray to list round numbers of the completion
        for (let i = 0; i < lel.series[0].data.length; i++) {
            const element = lel.series[0].data[i].y;
            newArray.push(Math.round(element))
        }

        // Set newNewArray to list all the houses
        for (let i = 0; i < lel.categories.length; i++) {
            const element = lel.categories[i];
            newNewArray.push(element)
        }

        // Maps the array of houses to the array of completion values
        // Creates an array of objects: {house: percentage}
        const objMap = (keyArray, valueArray, outArray) => {
            let progressObject = {}
            for (let i = 0; i < keyArray.length; i++) {
                progressObject = {}
                const key = keyArray[i];
                const value = valueArray[i];

                if (globalRegex.test(key)) {
                    continue;
                }

                progressObject[key] = value
                
                outArray.push(progressObject)
            }
        }

        objMap(newNewArray, newArray, finalArray)


        // console.log(finalArray)
        // console.log(newArray.length)
        // console.log(newNewArray.length)

        dirtyProgress = finalArray
        console.log(dirtyProgress)
        })
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(dirtyProgress)
        })
    }



// let form = JSON.parse(houses_progress.data.chartData)
// let date = JSON.parse(houses_progress.data.chartData)
// console.log(date.series)


