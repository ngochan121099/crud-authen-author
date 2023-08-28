import express from 'express';
import { deleteUserHandler, getUserHandler, getUsersHandler, updateProfileHandler } from './user.controller';
import verifyToken from '../core/middleware/verify.middleware';


const userRoutes = (app: express.Application): void => {
  app.get('/user/getusers', getUsersHandler);
  app.get('/user/:id', getUserHandler);
  app.put('/user/:id', verifyToken, updateProfileHandler);
  app.delete('/user/:id', verifyToken, deleteUserHandler);
};

export default userRoutes;