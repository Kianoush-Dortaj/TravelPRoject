
import OperationResult from "../../../core/Operation/OperationResult";
import { GenerateCode } from "./ValidatoinPattern/ValidationContext";

export interface ILoginRepository {
    UserrLogin(username: string, password: string): Promise<OperationResult<any>>;
    CheckAuthTwofactorCode(hash: string, code: string, phoneNumber: string): Promise<OperationResult<GenerateCode>>;
}