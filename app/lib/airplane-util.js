import inside from 'point-in-polygon';
import _ from 'lodash';
import constants from '../config/constants';

const AirplaneUtil = {

  isValid: function isValid (airplanes){
   let validAirplanes = airplanes
   
   return validAirplanes;
 },

 valid: function inView (airplanes){
    let airplanesInView = _.find(airplanes, {validtrack:1}) 
    return(airplanesInView) 
 },

 withDirections: function directionToLook (airplanes) {
    let airplanesInView = _.find(airplanes, {validtrack:1})
     airplanesInView = _calculateDistance(airplanesInView)
    return(airplanesInView) 
 }
}


function _calculateDistance (airplanes){
    let returnObject = []
  _.each(airplanes, function(plane) {
      console.log(plane)
      let o = constants.visualHorizonPolygon.origin
      let p = [plane.lat, plane.lon]

       //plan.distance = Math.sqrt(Math.pow(o[0] - p[0], 2) + Math.pow(o[1] - p[1],2))
//         visualHorizonPolygon: {
//     origin: [47.638418,-122.32635],
//     leftNear: [47.61163,-122.344437],
//     lettFar:  [47.588213,-122.450867],
//     rightNear: [47.65105,-122.347355],
//     rightFar: [47.700628,-122.451553],
//   },
      //lat":46.900909,"lon":-122.722504
    // (x2-x1)^2 + (y2-y1)^2
    console.log(plane)
    returnObject.push(plane)
  })
  return returnObject;
}


export default AirplaneUtil;