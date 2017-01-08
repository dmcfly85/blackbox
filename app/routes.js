import { Router } from 'express';
import AirplaneController from './controllers/airplane.controller';
import constants from './config/constants';

const routes = new Router();
const prefix = constants.apiPrefix;

routes.get(`/airplanes/all`, AirplaneController.all);
routes.get(`/airplanes/with_directions`, AirplaneController.withDirections);
routes.get(`/airplanes/raw`, AirplaneController.raw);

export default routes;
