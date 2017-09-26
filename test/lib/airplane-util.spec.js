require('babel-register');
const chai = require('chai');
const expect = chai.expect;
const ApU = require('../../app/lib/airplane-util.js');

let config = {
  visualHorizonPolygon: {
    origin  : [50, 0],
    leftFar : [0, 100],
    rightFar: [100, 100],
  }
};

let airplaneUtil = ApU(config);

describe('Airplane Util', ()=> {

  it('should find a point on a line with a percent', ()=> {
    let pointA = [0, 0];
    let pointB = [100, 100];
    expect(airplaneUtil.findPointOnLine(pointA, pointB, .1)).to.eql([10, 10]);
    expect(airplaneUtil.findPointOnLine(pointA, pointB, .5)).to.eql([50, 50]);
  });

  it('should return the correct directionToLook', () => {
    expect(airplaneUtil.directionToLook({lat:10, lon:99})).to.equal(.1);
    expect(airplaneUtil.directionToLook({lat:30, lon:99})).to.equal(.3);
    expect(airplaneUtil.directionToLook({lat:50, lon:99})).to.equal(.5);
    expect(airplaneUtil.directionToLook({lat:60, lon:99})).to.equal(.7);
    expect(airplaneUtil.directionToLook({lat:90, lon:99})).to.equal(.9);
  });

  it('should return the distance in miles between two lat lons', () => {
    expect(airplaneUtil.calculateDistance([47.608013, -122.335167], [37.773972,	-122.431297])).to.eql(679.48);
  });

})
