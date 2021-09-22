
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class TravelTypeController extends BaseController {


    async GetAllTravelTypeSelect(req: Request, res: Response, next: NextFunction) {


        try {
            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {
                let selectTravelType = await UnitOfWork.TravelTypeRepository.GetAllSelectTravelType();
                return this.OkObjectResult(res, {
                    data: selectTravelType.result
                }, selectTravelType.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }


    }


}