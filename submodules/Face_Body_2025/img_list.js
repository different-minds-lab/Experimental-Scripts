// THIS CODE IS WRITTEN TO BE RUN USING NODE, NOT ON CLIENT-SIDE I.E. NOT DURING EXPERIMENTS
// PRINTS OUT A LIST OF IMAGES SAVED IN SPECIFIC FOLDERS
// USE: node img_list.js > fileoutput.txt

//requiring path and fs modules and lodash
const path = require('path');
const fs = require('fs');
const _ = require('lodash')

//joining path of directory - change name of image folder accessed
const imgsPath = path.join(__dirname, './imgs/practice_stims');

// create globals for the image lists
let images = []

//passsing directoryPath and callback function
fs.readdir(imgsPath, function(err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    console.log("[")
    // add images to aggregated list
    files.forEach(el => {
        console.log('"./imgs/practice_stims/' + el + '",')
    });
    console.log("]")
});

// Opens file, reads throgh all items in file and spit out name of files / name of path in experiment.js file