
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class TravelRequestController extends BaseController {


    async CreateTravelRequest(req: Request, res: Response, next: NextFunction) {


        try {

            const { budget, city, country, travelType, travelResidence, startDate, description, endDate, lookingfor, } = req.body;
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;
            let dateNow = new Date();

            let addTravelRequest = await UnitOfWork.TravelRequestRepository.CreateTravelRequest({
                budget: budget,
                city: city,
                country: country,
                createDate: dateNow,
                description: description,
                endDate: endDate,
                lookingfor: lookingfor,
                startDate: startDate,
                travelResidence: travelResidence,
                travelType: travelType,
                userId: userId
            });
            if (addTravelRequest.success) {
                return this.Ok(res, addTravelRequest.message);
            }
            return this.BadRerquest(res, addTravelRequest.message)

        } catch (error: any) {
            return this.BadRerquest(res, error.message);
        }

    }

    async GetAllTravelRequestByUserId(req: Request, res: Response, next: NextFunction) {

        try {
            let validation = await this.ValidationAction(req, res);
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            if (!validation.haveError) {
                let getAllUserTravelRequest = await UnitOfWork.TravelRequestRepository.GetAllTravelRequestByUserId(userId);
                return this.OkObjectResult(res, {
                    data: getAllUserTravelRequest.result
                }, getAllUserTravelRequest.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }


    async GetAllTravelRequest(req: Request, res: Response, next: NextFunction) {

        try {
            
            let validation = await this.ValidationAction(req, res);

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            if (!validation.haveError) {

                let getAllUserTravelRequest = await UnitOfWork.TravelRequestRepository.GetAllTravelRequest(userId);
                return this.OkObjectResult(res, {
                    data: getAllUserTravelRequest.result
                }, getAllUserTravelRequest.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }


    async DeleteTravel(req: Request, res: Response, next: NextFunction) {

        try {
            let validation = await this.ValidationAction(req, res);
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            if (!validation.haveError) {
                let getAllUserTravelRequest = await UnitOfWork.TravelRequestRepository.DeleteRequest(req.params.id, userId);
                return this.Ok(res, getAllUserTravelRequest.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }
    }

    async UpdateTravel(req: Request, res: Response, next: NextFunction) {

        try {
            const {
                travelType,
                travelResidence,
                country,
                city,
                startDate,
                endDate,
                budget,
                lookingfor,
                description } = req.body;

            let validation = await this.ValidationAction(req, res);
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            if (!validation.haveError) {
                let getAllUserTravelRequest = await UnitOfWork.TravelRequestRepository
                    .UpdateRequest({
                        budget: budget,
                        city: city,
                        country: country,
                        description: description,
                        endDate: endDate,
                        lookingfor: lookingfor,
                        requestId: req.params.id,
                        startDate: startDate,
                        travelResidence: travelResidence,
                        travelType: travelType
                    }, userId);
                    
                return this.Ok(res, getAllUserTravelRequest.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }
    }

}