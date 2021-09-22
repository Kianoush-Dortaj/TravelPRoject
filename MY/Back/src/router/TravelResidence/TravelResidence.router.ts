import express, { Express, Router, NextFunction, Request, Response } from 'express';
import travelResidenceController from '../../Controllers/TravelResidenceController/TravelResidenceController';
import authrization from './../../Utilities/Middllware/Authorization';


const usersRouter = express.Router();

usersRouter.get('/Select', authrization.AuthToken, travelResidenceController.GetAllTravelResidenceSelect);

export default usersRouter;