import UserCollection from '../collection/user.collection';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Types } from 'mongoose';
import { LOGICAL_ERRORS } from '../../utils/constant';
import * as rbac from '../../authorization/casbin';

dotenv.config();

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      username?: string;
      id?: Types.ObjectId;
      role?: string;
    };
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    let authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.json(LOGICAL_ERRORS.UNAUTHENTICATED);
    }

    const action: any = {
      GET: 'reader',
      POST: 'writer',
      PUT: 'updater',
      DELETE: 'deleter',
    };
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(
      token,
      `${process.env.JWT_SECRET}`,
      async (err: any, decoded: any) => {
        if (err) {
          return res.json(LOGICAL_ERRORS.INVALID_TOKEN);
        }

        UserCollection.findById(decoded.id)
          .then(async (result) => {
            req.user = {
              username: result?.username,
              id: result?._id,
              role: result?.role,
            };
            const { _id: sub } = result?.id;

            const obj = req.path;
            const method = req.method;
            const act = action[method];
            await rbac.addPolicy(sub, obj, decoded.role);

            const checkRole = await rbac.enforce(sub, obj, act);
            if (!checkRole) {
              return res.status(403).json(LOGICAL_ERRORS.UNAUTHORIZATION);
            }

            next();
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      }
    );
  } catch (error) {
    throw error;
  }
};

export default verifyToken;
