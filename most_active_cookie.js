
/*
Author: Maija Philip
Date: 10/25/22
Coding Assignment for Quantcast
*/

/**
 * Reads the file and prints the most active cookie on a certain day, it if it's a tie,
 * it prints each tied cookie on a separate line
 * @param {string} filename - name of the cookie_log.csv file
 * @param {String} date - date you want most active cookies on
 */
 var most_active_cookie = function(filename, date) {

    // read file const
    const fs = require('fs');

    // reads the file + passes data on in the callback
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // console.log("Data");
        // console.log(data);

        // gives file data to func to analyze it
        analyze_cookies_data(data, date);
    });
 }


/**
 * given the data, prints the most active cookie on a certain day, it if it's a tie,
 * it prints each tied cookie on a separate line
 * @param {string} data - data of the cookie file
 * @param {String} date - date you want most active cookies on
 */
 var analyze_cookies_data = function(data, date) {
    
    // turn the data into an array with each entry
    let cookieEntries = data.split('\n');
    //console.log(cookieEntries);

    // create hash table
    var cookies = {};

    // loop through and add to hashTable with key as cookie and value as number of times it is used on the date specified
    cookieEntries.forEach(entry => {
        if (entry != 'cookie,timestamp') {
            let commaPos = entry.indexOf(',');
            let cookieName = entry.slice(0, commaPos);
            let cookieDate = entry.slice(commaPos + 1, entry.indexOf('T'));
            // console.log('Name: ' + cookieName + ", Date: " + cookieDate);


            if (cookieDate == date) {
                if (cookieName in cookies) {
                    cookies[cookieName] ++;
                }
                else {
                    cookies[cookieName] = 1;
                }
            }
        }
    });

    //console.log(cookies);

    let output = "";
    let highest = 0;
    // find the one(s) with the highest and print them
        // loop through and find highest, add to string
        // if same as highest -> add to the string with \n inbetween
        // if higher replace string with the cookie
    
    for(const key in cookies) {
        let frequency = cookies[key];
        if (frequency > highest) {
            output = key;
            highest = frequency;
        }
        else if (frequency == highest) {
            output += "\n" + key;
        }
    }

    //console.log("\n\nFINAL OUTPUT")
    console.log(output);

}; // end of function


// get the commandline arguments
let filename = process.argv[2];
let date = process.argv[4];
// console.log(filename, date);

// call it
most_active_cookie(filename, date);