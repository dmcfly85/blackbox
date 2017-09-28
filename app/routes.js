import { Router } from 'express';
import AirplaneController from './controllers/airplane.controller';

function router (config) {

  const airplaneController = new AirplaneController(config);
  const routes = new Router();
  routes.get('/airplanes/all', airplaneController.all);
  return routes;
}

export default router;
