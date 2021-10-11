
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class RequestController extends BaseController {


    async CreateRequest(req: Request, res: Response, next: NextFunction) {


        try {

            const { reciverUserId, targetRequestId, requestId, status } = req.body;

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;
            let dateNow = new Date();

            let addTravelRequest = await UnitOfWork.RequestRepository.CreateRequest({
                reciverUserId,
                requestId,
                senderUserId: userId,
                status,
                targetRequestId,
                createDate: dateNow
            });

            if (addTravelRequest.success) {
                return this.Ok(res, addTravelRequest.message);
            }

            return this.BadRerquest(res, addTravelRequest.message)

        } catch (error: any) {
            return this.BadRerquest(res, error.message);
        }

    }

    async ChangeRequestStatus(req: Request, res: Response, next: NextFunction) {

        try {
            const { requestId, status } = req.body;

            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {

                let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;
                let dateNow = new Date();

                let addTravelRequest = await UnitOfWork.RequestRepository.UpdateRequest({
                    requestId,
                    status,
                    userId
                });

                return this.Ok(res, addTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }

    async ConfirmRequest(req: Request, res: Response, next: NextFunction) {

        try {
            const { requestId, status } = req.body;

            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {

                let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

                let addTravelRequest = await UnitOfWork.RequestRepository.ConfirmRequest({
                    requestId,
                    status,
                    userId
                });

                return this.Ok(res, addTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }

    async RejectRequest(req: Request, res: Response, next: NextFunction) {

        try {
            const { requestId, status } = req.body;

            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {

                let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

                let addTravelRequest = await UnitOfWork.RequestRepository.RejectRequest({
                    requestId,
                    status,
                    userId
                });

                return this.Ok(res, addTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }

    async DeleteRequest(req: Request, res: Response, next: NextFunction) {

        try {
            const requestId = req.params.id;

            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {


                let deleteTravelRequest = await UnitOfWork.RequestRepository.DeleteRequest(requestId);

                return this.Ok(res, deleteTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }

    async GetAllUserRequest(req: Request, res: Response, next: NextFunction) {

        try {
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;


            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {

                let deleteTravelRequest = await UnitOfWork.RequestRepository.GetAllUserReciveRequest(userId);

                return this.OkObjectResult(res, {
                    data: deleteTravelRequest.result
                }, deleteTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }

    async GetAllReciveRequest(req: Request, res: Response, next: NextFunction) {

        try {
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;


            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {

                let deleteTravelRequest = await UnitOfWork.RequestRepository.GetAllReciveRequest(userId);

                return this.OkObjectResult(res, {
                    data: deleteTravelRequest.result
                }, deleteTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }

    async GetAllMyRequest(req: Request, res: Response, next: NextFunction) {

        try {
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;


            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {

                let deleteTravelRequest = await UnitOfWork.RequestRepository.GetAllMyRequest(userId);

                return this.OkObjectResult(res, {
                    data: deleteTravelRequest.result
                }, deleteTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }

    async GetAllUserRequests(req: Request, res: Response, next: NextFunction) {

        try {
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;


            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {

                let deleteTravelRequest = await UnitOfWork.RequestRepository.GetAllUserRequests(userId);

                return this.OkObjectResult(res, {
                    data: deleteTravelRequest.result
                }, deleteTravelRequest.message);

            }

            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            this.BadRerquest(res, error.message)
        }
    }


}