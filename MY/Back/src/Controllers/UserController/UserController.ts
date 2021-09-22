import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import OperationResult from "../../core/Operation/OperationResult";
import { IUserDoc } from "../../DataLayer/Context/User/IUserDock";
import { UserEntite } from "../../DataLayer/Context/User/User";
import { RedisManager } from './../../Utilities/Redis/RedisRepository';
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class UserController extends BaseController {



}