import BaseController from './base.controller';
import dumpService from '../lib/dump-service';
import airplaneUtil from '../lib/airplane-util';

//airplaneUtil = apu(config)

class AirplaneController extends BaseController {
  constructor() {
    super();
    this.all = this.all.bind(this);
  }

  all(req, res){
    console.log(dumpService.data)
    res.json(airplaneUtil.processAirplanes(dumpService.data));
  }

  raw(req, res){
    res.json(dumpService.data);
  }

  //processAirplanes(req, res){
    //res.json(airplaneUtil.processAirplanes(dumpService.data));
  //}
}


export default new AirplaneController();


