import BaseController from './base.controller';
import dumpService from '../lib/dump-service';
import airplaneUtil from '../lib/airplane-util';

class AirplaneController extends BaseController {
  constructor() {
    super();
    this.all = this.all.bind(this);
  }

  all(req, res){
    res.json(airplaneUtil.valid(dumpService.data));
  }

  raw(req, res){
    res.json(dumpService.data);
  }

  withDirections(req, res){
    res.json(airplaneUtil.withDirections(dumpService.data));
  }
}


export default new AirplaneController();


