import { NextFunction, Request, Response } from 'express';
import { deleteUser, getUser, getUsers, updateProfile } from '../service/user.service';

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getUsers();

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getUser({ id });

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

export const updateProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;    
    const result = await updateProfile(
      { id },
      {
        username: req.body.username,
      }
    );

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await deleteUser( { id });

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
}