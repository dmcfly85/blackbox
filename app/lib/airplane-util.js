import inside from 'point-in-polygon';
import _ from 'lodash';
import constants from '../config/constants';

const viewaArea = constants.visualHorizonPolygon;
const polygon = [
    viewaArea.origin,
    // viewaArea.leftNear,
    viewaArea.lettFar,
    // viewaArea.rightNear,
    viewaArea.rightFar,  
  ]

const AirplaneUtil = {

 valid: function inView (airplanes){
    let airplanesInView = _.filter(airplanes, {validtrack:1}) 
    return(airplanesInView) 
 },

 withDirections: function directionToLook (airplanes) {
    let airplanesInView = _.filter(airplanes, {validtrack:1})
     airplanesInView = _calculateDistance(airplanesInView)
    return(airplanesInView) 
 }
}


function _calculateDistance (airplanes){
    let returnObject = []
  
      _.each(airplanes, function(plane) {
        var lat1 = constants.visualHorizonPolygon.origin[0]
        var lat2 = plane.lat
        var lon1 = constants.visualHorizonPolygon.origin[1]
        var lon2 =  plane.lon

        //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
        var R = 3958.7558657440545; // Radius of earth in Miles
        var dLat = _toRad(lat2-lat1);
        var dLon = _toRad(lon2-lon1); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(_toRad(lat1)) * Math.cos(_toRad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
        
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        plane.distance = d.toFixed(2)

        plane.inViewArea = inside([plane.lat, plane.lon],polygon)
        console.log("inside",inside([47.638934,-122.374134],polygon))
        console.log(plane.inViewArea)

      returnObject.push(plane)
  })
  return returnObject;
}

function _toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}



export default AirplaneUtil;