import { NextFunction, Request, Response } from 'express';
import { signIn, signUp } from '../service/auth.service';

export const signUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await signUp({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    return res.status(201).json(result);
  } catch (error) {
    throw error;
  }
};

export const signInHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await signIn({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};
