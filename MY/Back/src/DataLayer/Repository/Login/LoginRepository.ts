import { ValidateEmailConfrim } from './ValidatoinPattern/ValidateEmailConfirm';
import { ILoginRepository } from "./ILoginRepository";
import { ValidateIsAdmin } from "./ValidatoinPattern/ValidateIsAdmin";
import { ValidateBlocked } from "./ValidatoinPattern/ValidateBlocked";
import { IHandler } from './ValidatoinPattern/IHandler';
import { GenerateCode, ValidationContext } from './ValidatoinPattern/ValidationContext';
import bcrypte from 'bcrypt';
import { ValidatePassword } from './ValidatoinPattern/ValidatePassword';
import { ValidateTowFactor } from './ValidatoinPattern/ValidateTowFactor';
import unitofWork from './../UnitOfWork/UnitOfWork';
import OperationResult from '../../../core/Operation/OperationResult';
import RedisKey from '../../../Utilities/Redis/RedisKey';
import RedisRepository from '../../../Utilities/Redis/RedisRepository';
import Emailrepository from './../../../Utilities/Email/NodeMailer';
import { UserEntite } from '../../Context/User/User';
import { IUserDoc } from '../../Context/User/IUserDock';

export default class LoginRepository implements ILoginRepository {

    // Login Special for login

    async UserrLogin(username: string, password: string): Promise<OperationResult<GenerateCode>> {

        let user = await UserEntite.findOne({ email: username });
        if (user) {

            const isBlocked = new ValidateBlocked();
            const isEmailComfirmed = new ValidateEmailConfrim();
            const isValidatePassword = new ValidatePassword(password);
            const isenavledtowfactor = new ValidateTowFactor();

            isValidatePassword.setNext(isBlocked)
                .setNext(isEmailComfirmed).setNext(isenavledtowfactor);

            let result = await this.ValidationManagerForLogin(isValidatePassword, user);

            if (result.HaveError) {
                return OperationResult.BuildFailur(result.Message)
            }

            if (result.Context.isTowfactor) {
                let displayName = user.firstName + user.lastName;
                let code = await RedisRepository.Get<any>(RedisKey.TowfactorKey + username);
                if(code.result)
                {
                    Emailrepository.sendTwofactorCode(username, 'Twfactor Code', displayName, code.result.code);
                    return OperationResult.BuildSuccessResult(result.Message, result.Context)
                }
                return OperationResult.BuildFailur('Error in generate code twofactor');
            }

            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(username);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message)
            }

            let token = await unitofWork.jwtRepository.GenerateToken(userInfo.result);

              if (token.success) {
                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    token: token.result,
                    userInfo: {
                        displayName: userInfo.result?.displayName,
                        userId:userInfo.result?.userId
                    }
                });
            }
            return OperationResult.BuildFailur(token.message)

        }
        return OperationResult.BuildFailur("Username or password is not currenct")

    }

    /*******
     * check Auth towfactor Code
     ******/

    async CheckAuthTwofactorCode(hash: string, code: string, email: string): Promise<OperationResult<GenerateCode>> {

        try {

            let userInfo = await unitofWork.userRepository.FindUserByEmail(email);
            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }

            let findKeyInRedis = await RedisRepository.Get<{ code: string, hash: string }>(RedisKey.TowfactorKey + email);

            if (!findKeyInRedis.success) {
                return OperationResult.BuildFailur(findKeyInRedis.message);
            } else if (findKeyInRedis.result?.code != code || findKeyInRedis.result?.hash != hash) {
                return OperationResult.BuildFailur('Your code is Expire . please Type again');
            }

            let userInfoLogin = await unitofWork.userRepository.GetUserInfoForLogin(email);

            if (!userInfoLogin.success) {
                return OperationResult.BuildFailur(userInfoLogin.message)
            }

            let token = await unitofWork.jwtRepository.GenerateToken(userInfoLogin.result);

            // let getUserInfo = await unitofWork.userRepository.GetUserInfoForLogin(email);

            if (token.success) {

                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    userInfo: {
                        displayName: userInfoLogin.result?.displayName
                    },
                    token: token.result
                });
            }

            return OperationResult.BuildFailur(token.message);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    // Validatoin Manager Login

    async ValidationManagerForLogin(handler: IHandler, user: IUserDoc): Promise<ValidationContext> {

        let result = handler.handle(user);
        return result;
    }

}