import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import OperationResult from "../../core/Operation/OperationResult";
import { IUserDoc } from "../../DataLayer/Context/User/IUserDock";
import { UserEntite } from "../../DataLayer/Context/User/User";
import { RedisManager } from './../../Utilities/Redis/RedisRepository';
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class ProfileController extends BaseController {



    async GetUserProfileInformation(req: Request, res: Response, next: NextFunction) {

        try {

            let validation = await this.ValidationAction(req, res);
            let decode = await UnitOfWork.jwtRepository.DecodeToken(req, res, next);

            if (!validation.haveError) {

                let userId = decode.result;
                let userInfo = await UnitOfWork.userRepository.GetUserProfileInformation(userId)

                if (userInfo.success) {
                    return this.OkObjectResult(res, {
                        data: userInfo.result
                    }, "Success Userinfo");
                } else {
                    return this.BadRerquest(res, userInfo.message);
                }
            }
            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            return this.InternalServerError(res, error.message);
        }

    }

    async UpdateAvatar(req: Request, res: Response, next: NextFunction) {

        try {
            let validation = await this.ValidationAction(req, res);
            let userId = await (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            if (!validation.haveError) {
                let updateavatar = await UnitOfWork.ProfileRepository.UploadProfileAvatar(userId, req.file);
                return this.Ok(res, updateavatar.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }

    }

    async GetAvatar(req: Request, res: Response, next: NextFunction) {

        try {
            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {
                let updateavatar = await UnitOfWork.ProfileRepository.GetUserAvatar(req.params.id);
                 res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(updateavatar.result); // Send the file data to the browser.
                return;
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }

    }

    async UpdatePoster(req: Request, res: Response, next: NextFunction) {

        try {
            let validation = await this.ValidationAction(req, res);
            let userId = await (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            if (!validation.haveError) {
                let updatePoster = await UnitOfWork.ProfileRepository.UploadProfilePoster(userId, req.file);
                return this.Ok(res, updatePoster.message)
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }

    }

    async GetPoster(req: Request, res: Response, next: NextFunction) {

        try {
            let validation = await this.ValidationAction(req, res);

            if (!validation.haveError) {
                let updateavatar = await UnitOfWork.ProfileRepository.GetUserPoster(req.params.id);
                 res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(updateavatar.result); // Send the file data to the browser.
                return;
            }

            return this.BadRerquest(res, validation.errorMessage[0])

        } catch (error: any) {
            this.InternalServerError(res, error.message)
        }

    }
}