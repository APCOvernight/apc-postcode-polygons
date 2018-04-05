'use strict'
const sectorPolygons = require('./PostcodeSectors')
const districtPolygons = require('./PostcodeDistricts')
 
class Polygons{
    getSectorPolygons(){
        return sectorPolygons['kml']['Document'][0]['Folder']
    }

    getDistrictPolygons(){
        return districtPolygons['kml']['Document'][0]['Folder']
    }
}

 


module.exports = Polygons