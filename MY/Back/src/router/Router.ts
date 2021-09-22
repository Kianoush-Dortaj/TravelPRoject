import { Router } from 'express';
import authRouter from './User/UserRouter';
import userRouter from './Profile/profile.router';
import travelResidenceRouter from './TravelResidence/TravelResidence.router';
import travelTypeRouter from './TravelType/TravelType.router';
import travelRequestRouter from './TravelRequest/TravelRequest.router';


const userRoutes = Router();

userRoutes.use('/auth', authRouter);

userRoutes.use('/profile', userRouter);

userRoutes.use('/travelType', travelTypeRouter);

userRoutes.use('/travelResidence', travelResidenceRouter);

userRoutes.use('/travelRequest', travelRequestRouter);


export default userRoutes;