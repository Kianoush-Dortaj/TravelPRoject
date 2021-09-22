import OperationResult from "../../../core/Operation/OperationResult";
import { ITravelTypeDocK } from "../../Context/TravelType/ITravelTypeDock";

export interface ITravelTypeRepository {
    GetAllSelectTravelType(): Promise<OperationResult<ITravelTypeDocK[]>>;
}