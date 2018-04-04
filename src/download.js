'use strict'
const http = require('https')
const fs = require('fs')

/**
 * Download postcode polygon information from doogal.co.uk.
 */
class PostcodeDownload {
 
  /**
   * Main code for downloading polygons.
   * @param {*} args
   * @param {*} options
   */
  async handle (args, options) {
    const url = 'https://www.doogal.co.uk/kml/PostcodeSectors.kml'
    const file = fs.createWriteStream('PostcodeSectors.kml')

    await http.get(url, (res) => {
      const { statusCode } = res
      let error
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`)
      }
      if (error) {
        console.error(`❌  error downloading KML file: ${error.message}`)
        // consume response data to free up memory
        res.resume()
        return
      }

      res.pipe(file)
      file.on('finish', () => {
        file.close()
        console.info('✨  Downloaded UK Postcode KML file')
      })
    }).on('error', (e) => {
      console.error(`❌  error downloading KML file: ${e.message}`)
    })
  }
}

module.exports = new PostcodeDownload().handle()