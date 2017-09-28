import BaseController from './base.controller';
import dumpService from '../lib/dump-service';
import airplaneUtil from '../lib/airplane-util';


class AirplaneController extends BaseController {
  constructor(config) {
    super();
    this.all = this.all.bind(this);
    this.airplaneUtil = airplaneUtil(config);
  }

  all(req, res){
    res.json(this.airplaneUtil.processAirplanes(dumpService.data));
  }

  raw(req, res){
    res.json(dumpService.data);
  }

}


export default AirplaneController;


