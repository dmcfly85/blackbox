import BaseController from './base.controller';
import dumpService from '../lib/dump-service';
import airplaneUtil from '../lib/airplane-util';

class AirplaneController extends BaseController {
  constructor() {
    super();
    this.all = this.all.bind(this);
  }

  all(req, res){
    res.json(airplaneUtil.abc(dumpService.data));
  }

  raw(req, res){
    res.json(dumpService.data);
  }

  //processAirplanes(req, res){
    //res.json(airplaneUtil.processAirplanes(dumpService.data));
  //}
}


export default new AirplaneController();


