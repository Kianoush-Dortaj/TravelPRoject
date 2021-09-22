import express, { Express, Router, NextFunction, Request, Response } from 'express';
import travelTypeController from '../../Controllers/TravelTypeController/TravelTypeController';
import authrization from './../../Utilities/Middllware/Authorization';


const usersRouter = express.Router();

usersRouter.get('/Select', authrization.AuthToken, travelTypeController.GetAllTravelTypeSelect);

export default usersRouter;