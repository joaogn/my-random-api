import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/resposeHandlers';
import avCalculator from './service';

// the controler class is used to make the connection between the UserRouter class and the Service class
// And returns the result of the promisses of the service class methods.

class AvCalculatorController {
  constructor () {};

  getRwyInUse (req: Request, res: Response) {
    const variables = {
      rwy1: Number(req.params.rwy1),
      rwy2: Number(req.params.rwy2),
      wind: Number(req.params.wind),
      dec: Number(req.params.dec),
      dir: req.params.dir

    };
    avCalculator
      .runwayInUse(variables)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error Calculate Runway in Use'));
  }

  idealOfDescent (req: Request, res: Response) {
    const variables = {
      crzAlt: Number(req.params.crzAlt),
      targetAlt: Number(req.params.targetAlt),
      descentRate: Number(req.params.descentRate),
      speed: Number(req.params.speed)
    };

    avCalculator
      .idealOfDescent(variables)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error Calculate Ideal of Descent'));
  }

  hpaToInhg (req: Request, res: Response) {
    const variables = {
      hpa: Number(req.params.hpa)
    };

    avCalculator
      .hpaToInhg(variables)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error pass hpa to inhg'));
  }

  inhgToHpa (req: Request, res: Response) {
    const variables = {
      inhg: Number(req.params.inhg)
    };

    avCalculator
      .inhgToHpa(variables)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error pass inhg to hpa'));
  }
}

export default new AvCalculatorController();
