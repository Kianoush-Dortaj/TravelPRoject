import { IJWTRepository } from '../JWT/IJWTRepository';
import JWTRepository from '../JWT/JWTRepository';
import { ILoginRepository } from '../Login/ILoginRepository';
import LoginRepository from '../Login/LoginRepository';
import { IProfileRepository } from '../Profile/IProfileRepository';
import { ProfileRepository } from '../Profile/ProfileRepository';
import { ITravelRequestRepository } from '../TravelRequest/ITravelRequestRepository';
import { TravelRequestRepository } from '../TravelRequest/TravelRequestRepository';
import { ITravelResidenceRepository } from '../TravelResdence/ITravelResidenceRepository';
import { TravelResidenceRepository } from '../TravelResdence/TravelResidenceRepository';
import { ITravelTypeRepository } from '../TravelType/ITravelTypeRepository';
import { TravelTypeRepository } from '../TravelType/TravelTypeRepository';
import IUserRepository from '../User/IUserRepository';
import { UserRepository } from '../User/UserRepository';
import { IUnitOfWork } from './IUnitOfWork';

export default new class UnitOfWork implements IUnitOfWork {

    userRepository: IUserRepository;
    jwtRepository: IJWTRepository;
    LoginRepository: ILoginRepository;
    ProfileRepository: IProfileRepository;
    TravelTypeRepository: ITravelTypeRepository;
    TravelResidenceRepository: ITravelResidenceRepository;
    TravelRequestRepository:ITravelRequestRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.jwtRepository = new JWTRepository();
        this.LoginRepository = new LoginRepository();
        this.ProfileRepository = new ProfileRepository();
        this.TravelTypeRepository = new TravelTypeRepository();
        this.TravelResidenceRepository = new TravelResidenceRepository()
        this.TravelRequestRepository = new TravelRequestRepository();
    }

}