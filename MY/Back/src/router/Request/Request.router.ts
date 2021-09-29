import express, { Express, Router, NextFunction, Request, Response } from 'express';
import requestController from '../../Controllers/RequestController/RequestController';
import authrization from './../../Utilities/Middllware/Authorization';

const requestRouter = express.Router();

requestRouter.post('/Create', authrization.AuthToken, requestController.CreateRequest);

requestRouter.put('/Update/:id', authrization.AuthToken, requestController.ChangeRequestStatus);

requestRouter.put('/ConfirmRequest', authrization.AuthToken, requestController.ConfirmRequest);

requestRouter.delete('/Delete/:id', authrization.AuthToken, requestController.DeleteRequest);

requestRouter.get('/GetAllUserRequest', authrization.AuthToken, requestController.GetAllUserRequest);

requestRouter.get('/GetAllReciveRequest', authrization.AuthToken, requestController.GetAllReciveRequest);

export default requestRouter;