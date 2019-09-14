// returns [lowerLeft, upperRight]
// lowerLeft & upperRight both length-2 arrays
function getLatLongBounds(lat, long) {
  let conversion = 0.0025;
  let lowerLat = Math.floor(lat / conversion) * conversion;
  let lowerLong = Math.floor(long / conversion) * conversion;

  return [
    [lowerLat, lowerLong],
    [lowerLat + conversion, lowerLong + conversion]
  ];
}

module.exports = {
  getLatLongBounds: getLatLongBounds
};
