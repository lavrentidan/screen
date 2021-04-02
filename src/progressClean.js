const houses_progress = require("./progress.json");

const globalRegex = new RegExp(/([*])\w+/);


let lel = JSON.parse(houses_progress.data.chartData)

// let form = JSON.parse(houses_progress.data.chartData)
// let date = JSON.parse(houses_progress.data.chartData)
// console.log(date.series)


// let progressObject = {}
let finalArray = []

let newArray = []
let newNewArray = []


for (let i = 0; i < lel.series[0].data.length; i++) {
    const element = lel.series[0].data[i].y;
    newArray.push(Math.round(element))
}


for (let i = 0; i < lel.categories.length; i++) {
    const element = lel.categories[i];
    newNewArray.push(element)
}

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

const dirtyProgress = finalArray

module.exports = {dirtyProgress}




