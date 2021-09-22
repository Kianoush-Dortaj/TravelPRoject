
import { register } from "ts-node";
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { Request, Response, NextFunction } from 'express';
import Webocket from './../../Utilities/Websocket/Websocket';

export default new class LoginController extends BaseController {



    async LoginUser(req: Request, res: Response, next: NextFunction) {

        try {

            let validation = await this.ValidationAction(req, res);
            if (!validation.haveError) {
                const { email, password } = req.body;

                let loginUser = await UnitOfWork.LoginRepository.UserrLogin(email, password)

                if (loginUser.success) {
                    Webocket.wss.emit('message', 'Login');

                    return this.OkObjectResult(res, loginUser.result, "Success Login");
                } else {
                    return this.BadRerquest(res, loginUser.message);
                }
            }
            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            return this.InternalServerError(res, error.message);
        }

    }

    async AdminCheckAuthTowfactor(req: Request, res: Response, next: NextFunction) {

        const { hash, code, email } = req.body;

        let result = await UnitOfWork.LoginRepository.CheckAuthTwofactorCode(hash, code, email);

        if (result.success && !result.result?.isTowfactor) {
            return this.OkObjectResult(res, {
                data: result.result
            }, "Success Towfactor");
        }

        return this.BadRerquest(res, result.message);

    }



}