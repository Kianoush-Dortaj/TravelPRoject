import OperationResult from "../../../core/Operation/OperationResult";
import { ITravelResidenceDocK } from "../../Context/Travelresidence/ITravelResidenceDock";


export interface ITravelResidenceRepository{
    GetAllSelectTravelResidence(): Promise<OperationResult<ITravelResidenceDocK[]>>
}