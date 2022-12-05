'use strict'

const xml2js = require('xml2js')
const fs = require('fs')
const path = require('path')

class KMLConverter {
    convert () {
        let parser = new xml2js.Parser()
        const files = ['PostcodeSectors.kml','PostcodeDistricts.kml']
        for(let filename of files){
            const destFile = filename.split('.')[0] + '.json'
            fs.readFile(filename, (err, data) => {
                if (err) {
                    throw err
                }
                parser.parseString(data, (err, result) => {
                    if (err) {
                        throw err
                    }
                fs.writeFile(destFile, JSON.stringify(result, null, 2), {encoding: 'utf8'}, () => { console.log("done!") })
                console.info('✨  Converted Postcode KML file ' + filename + ' to ' + destFile)
                })
            })
        }
    }
}

module.exports = new KMLConverter().convert()