import express, { Express, Router, NextFunction, Request, Response } from 'express';
import profileController from '../../Controllers/ProfileController/ProfileController';
import FileToField from '../../Utilities/Middllware/FileToField';
import authrization from './../../Utilities/Middllware/Authorization';
import uploadAvatar from './../../Utilities/Multer/AvatarUser';
import posterAvatar from './../../Utilities/Multer/PosterUsers';
import profileValidation from './ProfileValidation';


const usersRouter = express.Router();

usersRouter.get('/GetProfileInfo', authrization.AuthToken, profileController.GetUserProfileInformation);

usersRouter.post('/UploadAvatar',
    authrization.AuthToken,
    uploadAvatar.single('avatar'),
    profileController.UpdateAvatar
 );

usersRouter.get('/GetAvatar/:id', profileController.GetAvatar);

usersRouter.post('/UploadPoster', authrization.AuthToken, posterAvatar.single('poster'), profileController.UpdatePoster);

usersRouter.get('/GetPoster/:id', profileController.GetPoster);


export default usersRouter;