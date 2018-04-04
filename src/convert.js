'use strict'

const xml2js = require('xml2js')
const fs = require('fs')
const path = require('path')

class KMLConverter {
    convert () {
        let parser = new xml2js.Parser()
        fs.readFile('PostcodeSectors.kml', (err, data) => {
        if (err) {
            throw err
        }
        parser.parseString(data, (err, result) => {
        if (err) {
          throw err
        }
        fs.writeFile('PostcodeSectors.json', JSON.stringify(result, null, 2), 'utf8')
        console.info('✨  Converted Postcode KML file')
        
      })
    })
}
}
module.exports = new KMLConverter().convert()