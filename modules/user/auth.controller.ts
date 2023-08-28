import { NextFunction, Request, Response } from 'express';
import { signIn, signUp } from './auth.service';

const signUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await signUp({
      ...req.body,
    });

    return res.status(201).json(result);
  } catch (error) {
    throw error;
  }
};

const signInHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await signIn({
      ...req.body,
    });

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

export { signInHandler, signUpHandler };
