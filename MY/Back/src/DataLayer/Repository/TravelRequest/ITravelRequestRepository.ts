import OperationResult from "../../../core/Operation/OperationResult";
import { TravelRequestCreateModel } from "../../../DTO/TravelRequest/TravelRequestCreateModel";
import { TravelRequestUpdateModel } from "../../../DTO/TravelRequest/TravelRequestUpdateModel";

export interface ITravelRequestRepository {


    CreateTravelRequest(item: TravelRequestCreateModel): Promise<OperationResult<boolean>>;

    GetAllTravelRequestByUserId(userId: string): Promise<OperationResult<any>>;

    GetAllTravelRequest(userId: string): Promise<OperationResult<any>>;

    DeleteRequest(requestId: string, userId: string): Promise<OperationResult<boolean>>;

    UpdateRequest(item: TravelRequestUpdateModel, userId: string): Promise<OperationResult<boolean>>;

}