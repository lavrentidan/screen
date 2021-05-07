// import houses from './dataGrab';
import finalProgressFetch from './progressClean'
import fetch from 'node-fetch'
// import axios from 'axios';
const axios = require('axios')
// import { request } from 'http';
// const dirtyProgress = require("./progressClean")
// const newDirtyProgress = dirtyProgress
// let houses = require("./houses.json");
const { v4: uuidv4 } = require("uuid");
const https = require ('https');
const request = require('request');


// let houses;
// let url = "https://infinity-scraper-files.s3.us-east-2.amazonaws.com//tmp/houses.json"
// let options = {
//     json: true,
// };


// https.get(url,(res) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     let body = "";

//     res.on("data", (chunk) => {
//         body += chunk;
//     });

//     res.on("end", () => {
//         try {
//             houses = JSON.parse(body);
//             console.log(houses)
//         } catch (error) {
//             console.error(error.message);
//         };
//     });

// }).on("error", (error) => {
//     console.error(error.message)
// });


// request(url, options, (error, res, body) => {
//     if (error) {
//         return  console.log(error)
//     };

//     if (!error && res.statusCode === 200) {
//         console.log(body)
//         houses = body
//     };
// });




// function callback(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         const info = JSON.parse(body);
//         console.log(info)
//     }
// }

// request(options, callback);











const toWords = (input) => {
    var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    
    return input.match(regex);
}

const toCamelCase = (words) => {
    let result = "";
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let wordMod = word.toLowerCase();
        
        if (i !== 0) {
            wordMod = wordMod.substr(0,1).toUpperCase() + wordMod.substr(1);
        }
        
        result +=wordMod;
    }
    return result;
}

const createKeyArray = (inputArray) => {
    let result = [];
    for (let i = 0; i < inputArray.length; i++) {
        let entry = inputArray[i];
        let modEntry = toCamelCase(toWords(entry));
        result.push(modEntry);
    } 
    return result;
}

const objectMap = (keyArray, dataArray) => {
    for (let i = 1; i < dataArray.length; i++) {
        let element = dataArray[i];
        for (let j = 0; j < element.length; j++) {
            let elementItem = element[j];
            let keyItem = keyArray[j];
            houseObject[keyItem] = elementItem;
        }
        homes.push(houseObject)
        houseObject = {};
    }
}

const idAdd = (element) => {
    let newId = uuidv4()
    return newId
}

const formatDate = (element) => {
    if (element !== null) {
        let newDate = new Date(element.replace(/\s/, 'T')+'Z')
        let month = newDate.getMonth()+1
        let day = newDate.getDate()
        let year = newDate.getFullYear()
        
        
        return `${month}/${day}/${year}`
    } else {
        return null
    }
}

const toBoolean = (element) => {
    if (element === 'Yes') {
        return true
    } else if (element === 'No') {
        return false
    } else {
        return null
    }
}

const toHex = (element) => {
    return `#${element.substring(2)}`
}

const progressAppend = (element, progArray) => {
    for (let i = 0; i < progArray.length; i++) {
        const key = progArray[i];
        // console.log(key)
        if (element === Object.keys(key)[0]) {
            return Object.values(key)[0]
        }
    }
}




let homes = [];
let houseObject = {};
let dirtyProgress = [];

const fetchHouses = async () =>
    await (await fetch('/.netlify/functions/puller')).json();

async function finalFetch () {

    dirtyProgress = await (await finalProgressFetch())
    console.log(dirtyProgress)
    fetchHouses().then((houses) => {

    let firstRow = houses[0];
    let keys = createKeyArray(firstRow);

    objectMap(keys, houses);
    idAdd(homes)


    for (let i = 0; i < homes.length; i++) {
        const element = homes[i];
        
        element.id = idAdd(element)
        
        element.created = formatDate(element.created)
        element.actualStart = formatDate(element.actualStart)
        element.permit = formatDate(element.permit)
        element.citySub = formatDate(element.citySub)
        element.utilitiesPaid = formatDate(element.utilitiesPaid)
        element.utilitiesSent = formatDate(element.utilitiesSent)
        
        element.ccRs = toBoolean(element.ccRs)
        element.floorJoists = toBoolean(element.floorJoists)
        element.orderLumber = toBoolean(element.orderLumber)
        element.orderMaterial = toBoolean(element.orderMaterial)
        element.orderOsb = toBoolean(element.orderOsb)
        element.planReview = toBoolean(element.planReview)
        element.selections = toBoolean(element.selections)
        element.trusses = toBoolean(element.trusses)
        element.jobColor = toHex(element.jobColor)
        
        element.progress = progressAppend(element.jobName, dirtyProgress)
    }
}
)
    return homes
}

// finalFetch()


export default finalFetch;





// console.log(JSON.stringify(homes));
