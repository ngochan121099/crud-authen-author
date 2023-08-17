import UserCollection from '../collection/user.collection';
import { comparePassword, hashPassword } from '../helper/encryption';
import * as jwt from 'jsonwebtoken';
import { UserList } from '../interface/user.interface';
import { LOGICAL_ERRORS } from '../../utils/constant';

export const signUp = async (user: UserList) => {
  try {
    const existedUsername = await UserCollection.findOne({
      username: user.username,
    });

    if (existedUsername) {
      return LOGICAL_ERRORS.EXISTED_USERNAME;
    }

    const hashPwd = await hashPassword(user.password);

    const newUser = await UserCollection.create({
      username: user.username,
      password: hashPwd,
      role: user.role,
    });

    return {
      msg: 'Created successfully!',
      newUser,
    };
  } catch (error) {
    throw error;
  }
};

export const signIn = async (user: UserList) => {
  try {
    const findUser = await UserCollection.findOne({
      username: user.username,
    });
    if (!findUser) {
      return LOGICAL_ERRORS.USER_NOT_FOUND;
    }

    const verifyPassword = await comparePassword(user.password, findUser.password);

    if (!verifyPassword) {
      return LOGICAL_ERRORS.WRONG_PASSWORD;
    }

    const accessToken = jwt.sign(
      JSON.stringify({
        id: findUser._id,
        username: findUser.username,
        role: findUser.role,
      }),
      `${process.env.JWT_SECRET}`
    );

    const refreshToken = jwt.sign(
      JSON.stringify({
        id: findUser._id,
      }),
      `${process.env.JWT_SECRET}`
    );

    return {
      msg: 'Login successfully',
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};
