import OperationResult from "../../../core/Operation/OperationResult";
import { UserEntite } from "../../Context/User/User";
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import UtilService from './../../../Utilities/Util';
import RedisRepository from "../../../Utilities/Redis/RedisRepository";
import path from "path";
import { ITravelTypeRepository } from "./ITravelTypeRepository";
import { TravelTypeEntitie } from "../../Context/TravelType/TravelType";
import { ITravelTypeDocK } from "../../Context/TravelType/ITravelTypeDock";

export class TravelTypeRepository implements ITravelTypeRepository {


    constructor() {

    }

    async GetAllSelectTravelType(): Promise<OperationResult<ITravelTypeDocK[]>> {

        try {
            let TravelTypeSelect = await TravelTypeEntitie.find().select('name icon');
            console.log(TravelTypeSelect)
            return OperationResult.BuildSuccessResult('Get All Travel Type', TravelTypeSelect);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }


}
