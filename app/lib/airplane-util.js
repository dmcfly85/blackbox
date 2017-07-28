import inside from 'point-in-polygon';
import _ from 'lodash';
//import constants from '../config/constants';

module.exports = function (config) {

  const viewAreaPoints = config.visualHorizonPolygon;

  // viewAreaPolygons is created by slicing a triangle in two five triangles each sharing a single point
  let viewAreaPolygons = {

    entire: [
      viewAreaPoints.origin,
      viewAreaPoints.leftFar,
      viewAreaPoints.rightFar,
    ],

    leftFar:  [
      viewAreaPoints.origin,
      viewAreaPoints.leftFar,
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .2)
    ],

    leftCenter: [
      viewAreaPoints.origin,
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .2),
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .4)
    ],

    center:[
      viewAreaPoints.origin,
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .4),
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .6)
    ],

    rightCenter:  [
      viewAreaPoints.origin,
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .6),
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .8)
    ],

    right: [
      viewAreaPoints.origin,
      findPointOnLine(viewAreaPoints.leftFar, viewAreaPoints.rightFar, .8),
      viewAreaPoints.rightFar,
    ]
  };

  function directionToLook (airplane) {

    if(inside([airplane.lat, airplane.lon], viewAreaPolygons.leftFar)) {
      return .10;
    };

    if(inside([airplane.lat, airplane.lon], viewAreaPolygons.leftCenter)) {
      return .30;
    };

    if(inside([airplane.lat, airplane.lon], viewAreaPolygons.center)) {
      return .50;
    };

    if(inside([airplane.lat, airplane.lon], viewAreaPolygons.rightCenter)) {
      return .70;
    };

    if(inside([airplane.lat, airplane.lon], viewAreaPolygons.right)) {
      return .90;
    };

    return -1;
  };

  function processAirplanes (airplanes) {
    let results = [];
    airplanes.forEach((plane) => {
      plane.distance = calculateDistance([plane.lat, plane.log], viewAreaPoints.origin);
      plane.directionToLook = directionToLook(plane);
    })

    return results;
  }

  function calculateDistance (pointA, pointB ) {
    let lat1 = pointA[0];
    let lat2 = pointB[0];
    let lon1 = pointA[1];
    let lon2 = pointB[1];

    //Radius of the earth in:  1.609344 miles,  6371 km  | let R = (6371 / 1.609344);
    let R = 3958.7558657440545; // Radius of earth in Miles
    let dLat = toRadians(lat2 - lat1);
    let dLon = toRadians(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d.toFixed(2) / 1;
  }

  function findPointOnLine (pointA, pointB, percent) {
    let x = (pointA[0] * (1 - percent)) + (pointB[0] * percent);
    let y = (pointA[1] * (1 - percent)) + (pointB[1] * percent);
    return [x, y];
  }

  function toRadians(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
  }

  return {
    processAirplanes,
    directionToLook,
    calculateDistance,
    findPointOnLine,
  };

}
