'use strict'

const fs = require('fs').promises

class DistrictReducer {
  async reduce() {
    try {
      const filename = 'PostcodeDistricts.json';
      console.log(`reduce: Reading ${filename}...`);
      const jsonString = await fs.readFile(filename, 'utf8')
      const fullJson = JSON.parse(jsonString);
      const reduced = this.processFullJson(fullJson);
      this.saveResults(reduced);
    }
    catch(e) {
      console.error('reduce: Error reading file from disk:');
      console.error(e);
    }

    console.log('reduce: Done');
  }

  processFullJson(jsonString) {
    const placemarks = this.processFolder([], jsonString.kml.Document[0].Folder);
    return placemarks;
  }

  processFolder(placemarks, element) {
    element.forEach((folderElement) => {
      if (folderElement.Folder) {
        placemarks = this.processFolder(placemarks, folderElement.Folder);
      }

      if (!folderElement.Placemark) return placemarks;

      folderElement.Placemark.forEach(placemark => {
        console.log(`processFullJson: parsing ${placemark.name[0]}`);
        const result = {
          name: placemark.name[0],
          coordinates: []
        }
        let placemarkCoords = this.extractCoordsFromPlacemark(placemark);
        if (placemarkCoords) {
          const cleanedCoords = this.removeCrLF(placemarkCoords);
          const points = cleanedCoords.split(' ');
          points.forEach((part) => {
            const coords = part.split(',')
            result.coordinates.push({ lng: parseFloat(coords[0]), lat: parseFloat(coords[1]) })
          });
        }
        placemarks.push(result);
      });
    });

    return placemarks;
  }

  extractCoordsFromPlacemark(placemark) {
    let coordinates = [];

    if (placemark.MultiGeometry) {
      coordinates = placemark.MultiGeometry[0].Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0];
    }
    else if (placemark.Polygon) {
      coordinates = placemark.Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0];
    }

    return coordinates;
  }

  removeCrLF(string) {
    return string.trim().replace(/[\n\r]+/g, '')
  }

  async saveResults(results) {
    try {
      console.log('Writing results...');

      await fs.writeFile(
        'ReducedDistricts.json',
        JSON.stringify(results, null, 2),
        { encoding: 'utf8' });
      console.log('ReducedDistricts.json created');
    }
    catch (e) {
      console.error(e);
    }
  }
}

module.exports = new DistrictReducer().reduce()
