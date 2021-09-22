import express, { Express, Router, NextFunction, Request, Response } from 'express';
import travelRequestController from '../../Controllers/TravelRequestController/TravelRequestController';
import authrization from './../../Utilities/Middllware/Authorization';

const usersRouter = express.Router();

usersRouter.post('/Create', authrization.AuthToken, travelRequestController.CreateTravelRequest);

usersRouter.get('/GetAllByUserId', authrization.AuthToken, travelRequestController.GetAllTravelRequestByUserId);

usersRouter.delete('/Delete/:id', authrization.AuthToken, travelRequestController.DeleteTravel);

usersRouter.put('/Update/:id', authrization.AuthToken, travelRequestController.UpdateTravel);

export default usersRouter;