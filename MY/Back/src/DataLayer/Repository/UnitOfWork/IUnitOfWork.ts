import { IJWTRepository } from "../JWT/IJWTRepository";
import { ILoginRepository } from "../Login/ILoginRepository";
import { IProfileRepository } from "../Profile/IProfileRepository";
import { ITravelRequestRepository } from "../TravelRequest/ITravelRequestRepository";
import { ITravelResidenceRepository } from "../TravelResdence/ITravelResidenceRepository";
import { ITravelTypeRepository } from "../TravelType/ITravelTypeRepository";
import IUserRepository from "../User/IUserRepository";

export interface IUnitOfWork {

    userRepository: IUserRepository;
    jwtRepository: IJWTRepository;
    LoginRepository: ILoginRepository;
    ProfileRepository: IProfileRepository;
    TravelTypeRepository: ITravelTypeRepository;
    TravelResidenceRepository: ITravelResidenceRepository;
    TravelRequestRepository:ITravelRequestRepository;

}