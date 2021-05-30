// const houses_progress = require("./progress.json");
import finalFetch from './dataClean'
const { default: fetch } = require("node-fetch");




const globalRegex = new RegExp(/([*])\w+/);

let lel;
let dirtyProgress;

// Parses the json data and save it to a variable
const fetchProgress = async () => {
    lel = await (await fetch('/.netlify/functions/progressPuller')).json()
    // lel = JSON.parse(houses_progress)
    return lel
}


// let form = JSON.parse(houses_progress.data.chartData)
// let date = JSON.parse(houses_progress.data.chartData)
// console.log(date.series)

let finalArray = []
let newArray = []
let newNewArray = []

async function finalProgressFetch() {
    fetchProgress().then((lel) => {
        // let progressObject = {}


        // Set newArray to list round numbers of the completion
        for (let i = 0; i < lel.jobProgress.length; i++) {
            const element = lel.jobProgress[i];
            newArray.push(Math.round(element))
        }

        // Set newNewArray to list all the houses
        for (let i = 0; i < lel.jobName.length; i++) {
            const element = lel.jobName[i];
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
    })
    return finalArray
}




export default finalProgressFetch




