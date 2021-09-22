
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { Request, Response, NextFunction } from "express";

export default new class TravelTrsidenceController extends BaseController {

    async GetAllTravelResidenceSelect(req: Request, res: Response, next: NextFunction) {


        try {
            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {
                let travelResidence = await UnitOfWork.TravelResidenceRepository.GetAllSelectTravelResidence();
                return this.OkObjectResult(res, {
                    data: travelResidence.result
                }, travelResidence.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }


    }

}