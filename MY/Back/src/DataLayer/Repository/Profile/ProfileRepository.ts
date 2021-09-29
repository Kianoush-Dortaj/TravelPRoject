import OperationResult from "../../../core/Operation/OperationResult";
import { UserEntite } from "../../Context/User/User";
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import UtilService from './../../../Utilities/Util';
import RedisRepository from "../../../Utilities/Redis/RedisRepository";
import { IProfileRepository } from "./IProfileRepository";
import fs from "fs";
import path from "path";

export class ProfileRepository implements IProfileRepository {

    async UploadProfileAvatar(userId: string, file: any): Promise<OperationResult<boolean>> {

        try {

            let avatarUrl = '';

            avatarUrl = UtilService.getDirectoryImage(
                `${file.destination}/${file.originalname}`
            );

            await UserEntite.updateOne(
                { _id: userId },
                {
                    $set: {
                        avatar: avatarUrl
                    },
                }
            )

            await RedisRepository.ResetSingleItem(RedisKey.UserAvatar + userId, avatarUrl);
            return OperationResult.BuildSuccessResult('Upload Success', true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async GetUserAvatar(userId: string): Promise<OperationResult<any>> {

        try {

            let userAvatarUrl = undefined;

            let userAvatar = await RedisRepository.Get<any>(RedisKey.UserAvatar + userId);
            if (userAvatar.result) {
                userAvatarUrl = userAvatar.result;
            } else {
                let userInfo = await UserEntite.findById(userId).select('avatar');
                userAvatarUrl = userInfo?.avatar;
            }
            
            if (userAvatarUrl) {
                let data = await fs.readFileSync('F:/Projects/TravelPRoject/MY/Back/src/public' + userAvatarUrl);
                return OperationResult.BuildSuccessResult('Upload Success', data);
            }
            return OperationResult.BuildFailur('Error when finde image . try again');
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async UploadProfilePoster(userId: string, file: any): Promise<OperationResult<boolean>> {

        try {

            let posterUrl = '';

            posterUrl = UtilService.getDirectoryImage(
                `${file.destination}/${file.originalname}`
            );

            await UserEntite.updateOne(
                { _id: userId },
                {
                    $set: {
                        poster: posterUrl
                    },
                }
            )

            await RedisRepository.ResetSingleItem(RedisKey.UserPoster + userId, posterUrl);
            return OperationResult.BuildSuccessResult('Upload Success', true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async GetUserPoster(userId: string): Promise<OperationResult<any>> {

        try {

            let userPosterUrl = undefined;

            let userPoster = await RedisRepository.Get<any>(RedisKey.UserPoster + userId);

            if (userPoster.success) {
                userPosterUrl = userPoster.result;
            } else {
                let userInfo = await UserEntite.findById(userId).select('poster');
                userPosterUrl = userInfo?.poster;
            }

            if (userPosterUrl) {
                let data = await fs.readFileSync('F:/Projects/TravelPRoject/MY/Back/src/public' + userPosterUrl);
                return OperationResult.BuildSuccessResult('Upload Success', data);
            }

            return OperationResult.BuildFailur('Error when finde image . try again');
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

}
