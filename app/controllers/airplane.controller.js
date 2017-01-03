import BaseController from './base.controller';
import getDump from '../lib/get-dump';
import airplaneUtil from '../lib/airplane-util';

class AirplaneController extends BaseController {
  constructor() {
    super();
    this.all = this.all.bind(this);
  }

  all(req,res){
     getDump('http://piaware.local:8080/dump1090/data.json').then((results) => {
       let isView = airplaneUtil.valid(JSON.parse(results))
       res.json(isView)
     }).catch((err)=> {
       res.status(400).json(this.formatApiError(err));
    })
  }

  withDirections(req,res){
     getDump('http://piaware.local:8080/dump1090/data.json').then((results) => {
       let withDirections = airplaneUtil.withDirections(JSON.parse(results))
       console.log(withDirections)
       res.json(withDirections)
     }).catch((err)=> {
       res.status(400).json(this.formatApiError(err));
    })
  }

}



export default new AirplaneController();


// samp1 = {[{"hex":"a6e131","squawk":"6634","flight":"AAL648","lat":47.494874,"lon":-122.182265,"validposition":1,"altitude":11450,"vert_rate":-1344,"track":1,"validtrack":1,"speed":287,"messages":297,"seen":0,"mlat":false},{"hex":"a51acb","squawk":"0000","flight":"","lat":0,"lon":0,"validposition":0,"altitude":8850,"vert_rate":0,"track":0,"validtrack":0,"speed":0,"messages":546,"seen":0,"mlat":false},{"hex":"a97089","squawk":"0000","flight":"","lat":0,"lon":0,"validposition":0,"altitude":4150,"vert_rate":0,"track":0,"validtrack":0,"speed":0,"messages":8,"seen":208,"mlat":false},{"hex":"adddda","squawk":"6740","flight":"","lat":0,"lon":0,"validposition":0,"altitude":6700,"vert_rate":0,"track":0,"validtrack":0,"speed":0,"messages":986,"seen":0,"mlat":false},{"hex":"a52849","squawk":"4613","flight":"","lat":0,"lon":0,"validposition":0,"altitude":3150,"vert_rate":0,"track":0,"validtrack":0,"speed":0,"messages":2264,"seen":0,"mlat":false},{"hex":"a06461","squawk":"3636","flight":"","lat":0,"lon":0,"validposition":0,"altitude":2600,"vert_rate":0,"track":0,"validtrack":0,"speed":0,"messages":820,"seen":1,"mlat":false},{"hex":"a613e0","squawk":"1337","flight":"ASA489  ","lat":47.56041,"lon":-122.316971,"validposition":1,"altitude":2425,"vert_rate":-896,"track":181,"validtrack":1,"speed":164,"messages":6538,"seen":78,"mlat":false},{"hex":"a4c816","squawk":"4754","flight":"","lat":0,"lon":0,"validposition":0,"altitude":2475,"vert_rate":0,"track":0,"validtrack":0,"speed":0,"messages":4278,"seen":159,"mlat":false},{"hex":"a4cf84","squawk":"7020","flight":"","lat":0,"lon":0,"validposition":0,"altitude":2425,"vert_rate":0,"track":0,"validtrack":0,"speed":0,"messages":2132,"seen":260,"mlat":false}]}