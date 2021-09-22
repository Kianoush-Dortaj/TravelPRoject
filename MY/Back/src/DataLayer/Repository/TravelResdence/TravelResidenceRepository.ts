import OperationResult from "../../../core/Operation/OperationResult";
import { UserEntite } from "../../Context/User/User";
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import UtilService from './../../../Utilities/Util';
import RedisRepository from "../../../Utilities/Redis/RedisRepository";
import path from "path";
import { TravelResidenceEntitie } from "../../Context/TravelResidence/TravelResidence";
import { ITravelResidenceDocK } from "../../Context/TravelResidence/ITravelResidenceDock";
import { ITravelResidenceRepository } from "./ITravelResidenceRepository";

export class TravelResidenceRepository implements ITravelResidenceRepository {


    constructor() {

    }

    async GetAllSelectTravelResidence(): Promise<OperationResult<ITravelResidenceDocK[]>> {

        try {
            let TravelResidenceSelect = await TravelResidenceEntitie.find().select('name icon');
            return OperationResult.BuildSuccessResult('Get All Travel Type', TravelResidenceSelect);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }


}
