import express from 'express';
import { signInHandler, signUpHandler } from '../controller/auth.controller';

const authRoutes = (app: express.Application): void => {  
  app.post('/auth/createuser', signUpHandler);
  app.post('/auth/login', signInHandler);
};

export default authRoutes;