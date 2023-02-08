# APC Postcode Polygons

JSON converted version of the XML data for UK postcodes (excluding Belfast).  The data has been downloaded from doogal.co.uk and converted to json.  

## How to use

Add detailed usage instructions here.

## How to maintain
This package contains 2 scripts for updating and converting.  These scripts are mainly for maintaining this package.

### `npm run download`
Downloads the postcode KML fiile from doogal.co.uk and converts it to a JSON file.

### `npm run convert`
Converts an existing KML file into a JSON file.

### `npm run reduce`
Reduces the converted KML into a simpler JSON file with a simple structure of
```
[
  {
    "name": "string",
    "coordinates": [
      {
        "lng": double,
        "lat": double
      },
      ...
    ]
  },
  ...
]
```